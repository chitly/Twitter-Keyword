import _ from "../modules/lodash.ts";
import moment, { Moment } from "../modules/moment.ts";
import env from "../modules/dotenv.ts";

import db from "./db.ts";
import { Tweet } from "./types.ts";

export const getQuery = (
  keyword: string,
  language: string,
  date: Moment,
): string => {
  const since = moment(date).format("YYYY-MM-DD");
  const until = moment(date).add(1, "days").format("YYYY-MM-DD");
  const kQuery = keyword
    ? `(${keyword.toLowerCase().split(",").join(" OR ")})`
    : "";
  const query = `${kQuery} until:${until} since:${since} lang:${language}`;
  return query;
};

export const fetchToken = async (): Promise<string> => {
  const url = "https://api.twitter.com/1.1/guest/activate.json";
  const fetchOption = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.BEARER}`,
    },
  };
  const res = await fetch(url, fetchOption);
  const { guest_token } = await res.json();
  return guest_token;
};

export const fetchTweets = async (
  keyword: string,
  token: string,
  cursor: string,
): Promise<{ tweets: Tweet[]; nextCursor: string }> => {
  const url = "https://api.twitter.com/2/search/adaptive.json?";
  const params = new URLSearchParams({
    include_profile_interstitial_type: "1",
    include_blocking: "1",
    include_blocked_by: "1",
    include_followed_by: "1",
    include_want_retweets: "1",
    include_mute_edge: "1",
    include_can_dm: "1",
    include_can_media_tag: "1",
    skip_status: "1",
    cards_platform: "Web-12",
    include_cards: "1",
    include_composer_source: "true",
    include_ext_alt_text: "true",
    include_reply_count: "1",
    tweet_mode: "extended",
    include_entities: "true",
    include_user_entities: "true",
    include_ext_media_color: "true",
    include_ext_media_availability: "true",
    send_error_codes: "true",
    simple_quoted_tweet: "true",
    q: keyword,
    count: "20",
    query_source: "typed_query",
    ...(cursor ? { cursor } : {}),
    pc: "1",
    spelling_corrections: "1",
    ext: "mediaStats,highlightedLabel,cameraMoment",
    include_quote_count: "true",
  });
  const fetchOption = {
    headers: {
      "Authorization": `Bearer ${env.BEARER}`,
      "x-guest-token": token,
    },
  };
  const res = await fetch(url + params, fetchOption);
  const resJson = await res.json();
  const { tweets } = resJson.globalObjects;
  let nextCursor = "";
  if (cursor) {
    const { entry } = resJson.timeline.instructions[2].replaceEntry;
    if (entry.entryId === "sq-cursor-bottom") {
      const { value } = entry.content.operation.cursor;
      nextCursor = value;
    }
  } else {
    const { entries } = resJson.timeline.instructions[0].addEntries;
    const entry =
      _.filter(entries, _.matches({ entryId: "sq-cursor-bottom" }))[0];
    const { value } = entry.content.operation.cursor;
    nextCursor = value;
  }
  const filteredTweets = _.mapObject(
    tweets,
    (
      {
        id_str,
        user_id_str,
        full_text,
        lang,
        created_at,
        in_reply_to_status_id_str,
        in_reply_to_user_id_str,
        retweet_count,
        favorite_count,
        reply_count,
        quote_count,
      }: {
        id: number;
        id_str: string;
        user_id_str: string;
        full_text: string;
        lang: string;
        created_at: string;
        in_reply_to_status_id_str: string;
        in_reply_to_user_id_str: string;
        retweet_count: number;
        favorite_count: number;
        reply_count: number;
        quote_count: number;
      },
    ) => {
      return {
        parent_id: in_reply_to_status_id_str,
        parent_user_id: in_reply_to_user_id_str,
        id: id_str,
        user_id: user_id_str,
        full_text,
        lang,
        retweet_count,
        favorite_count,
        reply_count,
        quote_count,
        created_at: moment(created_at, "ddd MMM D HH:mm:ss Z YYYY").format(
          "YYYY-MM-DD HH:mm:ss",
        ),
      };
    },
  );
  const orderedTweets = _.orderBy(
    filteredTweets,
    ({ created_at }: { created_at: string }) => created_at,
    ["desc"],
  );
  return {
    tweets: orderedTweets,
    nextCursor,
  };
};

export const saveTweets = async (
  tweets: Tweet[],
  idTweets: Set<string>,
  keyword: string,
): Promise<
  { nTweets: number; nTweetsSaved: number; nTweetsKeywordsSaved: number }
> => {
  let nTweets = 0;
  let nTweetsSaved = 0;
  let nTweetsKeywordsSaved = 0;
  for (const tweet of tweets) {
    const {
      parent_id,
      parent_user_id,
      id,
      user_id,
      full_text,
      lang,
      retweet_count,
      favorite_count,
      reply_count,
      quote_count,
      created_at,
    } = tweet;
    if (!idTweets.has(id)) {
      idTweets.add(id);
      nTweets++;
    }
    const hasTweet = await db.query("SELECT 1 FROM Tweets WHERE Id = ?", [id]);
    if (hasTweet.length === 0) {
      await db.execute(
        `INSERT INTO Tweets(
        Id,
        UserId,
        Text,
        Lang,
        Nretweet,
        Nfavorite,
        Nreply,
        Nqoute,
        ParentId,
        ParentUserId,
        CreatedAt
      ) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          user_id,
          full_text,
          lang,
          retweet_count,
          favorite_count,
          reply_count,
          quote_count,
          parent_id,
          parent_user_id,
          created_at,
        ],
      );
      nTweetsSaved++;
    }
    const keywords = keyword.toLowerCase().split(",");
    for (const k of keywords) {
      if (full_text.toLowerCase().indexOf(k) >= 0) {
        const hasKeyword = await db.query(
          "SELECT 1 FROM Tweets_Keywords WHERE TweetId = ? AND Keyword = ?",
          [id, k],
        );
        if (hasKeyword.length === 0) {
          await db.execute(
            "INSERT INTO Tweets_Keywords(TweetId, Keyword, CreatedAt) values(?, ?, ?)",
            [id, k, created_at],
          );
          nTweetsKeywordsSaved++;
        }
      }
    }
  }
  return { nTweets, nTweetsSaved, nTweetsKeywordsSaved };
};

export const sleep = (sec: number): Promise<any> => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};

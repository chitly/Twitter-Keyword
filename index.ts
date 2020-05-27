import moment from "./modules/moment.ts";
import args from "./modules/args.ts";

import {
  getQuery,
  fetchToken,
  fetchTweets,
  saveTweets,
  sleep,
} from "./libs/utils.ts";
import { DBTweets } from "./libs/types.ts";

const startTime = moment();
const { keyword, since, until } = args;
console.log("keyword", keyword, "since", since, "until", until);
const dbTweets: DBTweets = {
  ids: new Set(),
  tweets: [],
};

for (
  let p = moment(until, "YYYY-MM-DD");
  p >= moment(since, "YYYY-MM-DD");
  p = p.add(-1, "days")
) {
  const query = getQuery(keyword, p);
  console.log("query", query);
  const queryTime = moment();
  const token = await fetchToken();
  let cursor = "";

  let count = 0;
  const maxTries = 3;
  while (count < maxTries) {
    try {
      while (true) {
        const tmpTime = moment();
        const { tweets, nextCursor } = await fetchTweets(
          query,
          token,
          cursor,
        );
        if (!saveTweets(dbTweets, tweets)) {
          break;
        }
        const timeUsed = moment.duration(moment().diff(tmpTime)).asSeconds();
        console.log("time used", timeUsed, "sec");
        console.log("got", dbTweets.tweets.length, "tweets");
        cursor = nextCursor;
      }
      const timeUsed = moment.duration(moment().diff(queryTime)).asSeconds();
      console.log("query time used", timeUsed, "sec");
      break;
    } catch (err) {
      console.log("try", count, "cursor", cursor);
      await sleep(60);
      if (++count == maxTries) throw err;
    }
  }
}

// console.log(dbTweets.tweets.slice(0, 10));
const timeUsed = moment.duration(moment().diff(startTime)).asSeconds();
console.log("all time used", timeUsed, "sec");

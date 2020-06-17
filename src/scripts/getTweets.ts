import moment from "../modules/moment.ts";

import {
  getQuery,
  fetchToken,
  fetchTweets,
  saveTweets,
  sleep,
} from "../libs/utils.ts";

const getTweets = async (
  keywords: Array<string>,
  language: string,
  since: string,
  until: string,
) => {
  const startTime = moment();
  console.log(
    `keyword=${keywords} language=${language} since=${since} until=${until}`,
  );
  for (
    let p = moment(until, "YYYY-MM-DD");
    p >= moment(since, "YYYY-MM-DD");
    p = p.add(-1, "days")
  ) {
    const query = getQuery(keywords, language, p);
    console.log("query", query);
    const queryTime = moment();
    const token = await fetchToken();
    let cursor = "";
    const idTweets: Set<string> = new Set();

    let fetchRetry = 0;
    const maxFetchRetries = 3;
    while (fetchRetry < maxFetchRetries) {
      try {
        let saveRetry = 0;
        const maxSaveRetries = 3;
        while (saveRetry < maxSaveRetries) {
          const tmpTime = moment();
          const { tweets, nextCursor } = await fetchTweets(
            query,
            token,
            cursor,
          );
          const { nTweetsSaved, nTweetsKeywordsSaved } = await saveTweets(
            tweets,
            idTweets,
            keywords,
          );
          if (nTweetsSaved === 0) {
            console.log("saveRetry", saveRetry);
            if (++saveRetry === maxSaveRetries) break;
          }
          const timeUsed = moment.duration(moment().diff(tmpTime)).asSeconds();
          console.log("time used", timeUsed, "sec");
          console.log(`saved ${nTweetsSaved} tweets`);
          console.log(`saved ${nTweetsKeywordsSaved} tweets_keywords`);
          cursor = nextCursor;
        }
        const timeUsed = moment.duration(moment().diff(queryTime)).asSeconds();
        console.log("query time used", timeUsed, "sec");
        break;
      } catch (err) {
        console.log("fetchRetry", fetchRetry, "cursor", cursor);
        await sleep(60);
        if (++fetchRetry === maxFetchRetries) throw err;
      }
    }
  }
  const timeUsed = moment.duration(moment().diff(startTime)).asSeconds();
  console.log("all time used", timeUsed, "sec");
};

export default getTweets;

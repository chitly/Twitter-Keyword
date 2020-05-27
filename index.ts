import moment from "./modules/moment.ts";

import { fetchToken, fetchTweets, saveTweets, sleep } from "./libs/utils.ts";
import { DBTweets } from "./libs/types.ts";

const startTime = moment();
const keyword = "โควิด until:2020-05-28 since:2020-05-27";
const token = await fetchToken();
let cursor = "";
const dbTweets: DBTweets = {
  ids: new Set(),
  tweets: [],
};

let count = 0;
const maxTries = 3;
while (count < maxTries) {
  try {
    do {
      const tmpTime = moment();
      const { tweets, nextCursor } = await fetchTweets(keyword, token, cursor);
      if (!saveTweets(dbTweets, tweets)) {
        break;
      }
      const timeUsed = moment.duration(moment().diff(tmpTime)).asSeconds();
      console.log("time used", timeUsed, "sec");
      console.log("get", dbTweets.tweets.length, "tweets");
      // console.log(dbTweets.tweets[dbTweets.tweets.length - 1]);
      cursor = nextCursor;
    } while (cursor);
    const timeUsed = moment.duration(moment().diff(startTime)).asSeconds();
    console.log("all time used", timeUsed, "sec");
    break;
  } catch (err) {
    console.log("try", count, "cursor", cursor);
    await sleep(60);
    if (++count == maxTries) throw err;
  }
}

// console.log(dbTweets.tweets.slice(0, 10));

import moment from "./modules/moment.ts";

import { fetchToken, fetchTweets } from "./libs/utils.ts";

const startTime = moment();
const keyword = "โควิด";
const token = await fetchToken();
let cursor = "";
do {
  const tmpTime = moment();
  const { tweets, nextCursor }: { tweets: Array<Object>; nextCursor: string } =
    await fetchTweets(
      keyword,
      token,
      cursor,
    );
  const timeUsed = moment.duration(moment().diff(tmpTime)).asSeconds();
  console.log("time used", timeUsed, "sec");
  console.log("get", tweets.length, "tweets");
  cursor = nextCursor;
} while (cursor);
const timeUsed = moment.duration(moment().diff(startTime)).asSeconds();
console.log("all time used", timeUsed, "sec");

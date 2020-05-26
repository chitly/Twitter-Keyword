import { unEscape } from "../modules/lodash.ts";

export const fetchTweet = async (keyword: string) => {
  const url = `https://twitter.com/search`;
  const params = new URLSearchParams({
    q: keyword,
    src: "typed_query",
  });
  const res = await fetch(url + params);
  const body = new Uint8Array(await res.arrayBuffer());
  return unEscape(body);
};

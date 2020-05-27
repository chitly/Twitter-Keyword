import { parse } from "https://deno.land/std/flags/mod.ts";
const args = parse(Deno.args);
const fullArgs: {
  keyword: string;
  hashtag: string;
  since: string;
  until: string;
} = {
  keyword: args.k || args.keyword || "",
  hashtag: args.h || args.hashtag || "",
  since: args.s || args.since || "",
  until: args.u || args.until || "",
};
export default fullArgs;

import { parse } from "https://deno.land/std/flags/mod.ts";
const args = parse(Deno.args);
const fullArgs: {
  keyword: string;
  language: string;
  since: string;
  until: string;
} = {
  keyword: args.k || args.keyword || "",
  language: args.l || args.language || "th",
  since: args.s || args.since || "",
  until: args.u || args.until || "",
};
export default fullArgs;

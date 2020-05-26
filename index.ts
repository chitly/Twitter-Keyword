import { fetchTweet } from "./libs/utils.ts";
const keyword = "โควิด";
await Deno.stdout.write(await fetchTweet(keyword));

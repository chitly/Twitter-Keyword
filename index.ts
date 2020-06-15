import args from "./src/modules/args.ts";
import getTweets from "./src/scripts/getTweets.ts";

const { keyword, language, since, until } = args;
if (keyword && language && since && until) {
  getTweets(keyword, language, since, until);
} else {
  console.log("Can't run this command");
}

import args from './src/modules/args.ts';
import getTweets from './src/scripts/getTweets.ts';
import { KeywordGroups } from './src/domains/groups.ts';

const { keyword, language, since, until, group, extend } = args;
if (keyword && since && until) {
  getTweets([keyword], language, since, until);
} else if (group && since && until) {
  if (group in KeywordGroups) {
    const { required, others } = KeywordGroups[group];
    if (extend) {
      getTweets([required.join(','), others.join(',')], language, since, until);
    } else {
      getTweets([required.join(',')], language, since, until);
    }
  }
} else {
  console.log("Can't run this command");
}

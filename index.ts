import args from './src/modules/args.ts';
import getTweets from './src/scripts/getTweets.ts';
import { KeywordGroups } from './src/domains/groups.ts';

const { keyword, language, since, until, group, extend, all } = args;
if (keyword) {
  getTweets([keyword], language, since, until);
} else if (group) {
  if (group in KeywordGroups) {
    const { required, others } = KeywordGroups[group];
    if (extend) {
      getTweets([required.join(','), others.join(',')], language, since, until);
    } else {
      getTweets([required.join(',')], language, since, until);
    }
  }
} else if (all) {
  const getAll = async () => {
    for (const group of Object.keys(KeywordGroups)) {
      console.log('group', group);
      const { required, others } = KeywordGroups[group];
      await getTweets([required.join(',')], language, since, until);
      await getTweets(
        [required.join(','), others.join(',')],
        language,
        since,
        until
      );
    }
  };
  getAll();
} else {
  console.log("Can't run this command");
}

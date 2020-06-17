import args from './src/modules/args.ts';
import getTweets from './src/scripts/getTweets.ts';
import {
  saveKeywords,
  saveTopics,
  saveDomains,
} from './src/scripts/saveInfo.ts';
import { TopicKeywords } from './src/domains/groups.ts';

const { keyword, language, since, until, topic, extend, all, saveInfo } = args;
if (keyword) {
  getTweets([keyword], language, since, until);
} else if (topic) {
  if (topic in TopicKeywords) {
    const { required, others } = TopicKeywords[topic];
    if (extend && others) {
      getTweets([required.join(','), others.join(',')], language, since, until);
    } else {
      getTweets([required.join(',')], language, since, until);
    }
  }
} else if (all) {
  const getAll = async () => {
    for (const topic of Object.keys(TopicKeywords)) {
      console.log('topic', topic);
      const { required, others } = TopicKeywords[topic];
      await getTweets([required.join(',')], language, since, until);
      if (others) {
        await getTweets(
          [required.join(','), others.join(',')],
          language,
          since,
          until
        );
      }
    }
  };
  getAll();
} else if (saveInfo) {
  const saveAllInfo = async () => {
    await saveKeywords();
    await saveTopics();
    await saveDomains();
    console.log('save completed');
  };
  saveAllInfo();
} else {
  console.log("Can't run this command");
}

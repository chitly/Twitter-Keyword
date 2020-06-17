import db from '../libs/db.ts';
import { DomainTopics, TopicKeywords } from '../domains/groups.ts';

export const saveKeywords = async () => {
  let keywords: Array<string> = [];
  for (const topic of Object.keys(TopicKeywords)) {
    const { required, others } = TopicKeywords[topic];
    keywords = [...keywords, ...required];
    if (others) {
      keywords = [...keywords, ...others];
    }
  }
  for (const keyword of keywords) {
    await db.execute('REPLACE INTO Keywords(Keyword) values(?)', [keyword]);
  }
};

export const saveTopics = async () => {
  for (const topic of Object.keys(TopicKeywords)) {
    const { required } = TopicKeywords[topic];
    for (const keyword of required) {
      await db.execute(
        'REPLACE INTO Topics_Keywords(Topic, Keyword) values(?, ?)',
        [topic, keyword]
      );
    }
  }
};

export const saveDomains = async () => {
  for (const domain of Object.keys(DomainTopics)) {
    const topics = DomainTopics[domain];
    for (const topic of topics) {
      await db.execute(
        'REPLACE INTO Domains_Topics(Domain, Topic) values(?, ?)',
        [domain, topic]
      );
    }
  }
};

export default { saveKeywords, saveTopics, saveDomains };

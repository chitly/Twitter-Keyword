import { getDB } from './db';
import {
  getInsertTweetsSql,
  getBigQueryClient,
  query,
  writeTweetsJson,
  writeKeywordsJson,
  writeGroupsKeywordsJson,
  writeTopicsGroupsJson,
} from './utils';

const syncDatabaseWtihBigQuery = async () => {
  try {
    const db = await getDB();
    const tweets = await db.query('select * from Tweets');
    const tweets_keywords = await db.query('select * from Tweets_Keywords');
    const insertTweetsSql = getInsertTweetsSql(tweets);
    const bigquery = getBigQueryClient();
    const results = await query(
      bigquery,
      insertTweetsSql,
      tweets.map(({ text }) => text)
    );
    console.log(results);
  } catch (err) {
    console.error('syncDatabaseWtihBigQuery', err);
    throw err;
  }
};

const exportJsonFile = async () => {
  try {
    const db = await getDB();
    const tweets = await db.query('select * from Tweets');
    const keywords = await db.query('select * from Keywords');
    const groupsKeywords = await db.query('select * from Groups_Keywords');
    const topicsGroups = await db.query('select * from Topics_Groups');
    writeTweetsJson(tweets);
    writeKeywordsJson(keywords);
    writeGroupsKeywordsJson(groupsKeywords);
    writeTopicsGroupsJson(topicsGroups);
    console.log('Completed');
  } catch (err) {
    console.error('exportJsonFile', err);
    throw err;
  }
};

console.log('Start export json for importing to bigquery');
try {
  exportJsonFile();
} catch (err) {
  console.error('error', err);
  throw err;
}

import { getDB } from './db';

const syncDatabaseWtihBigQuery = async () => {
  const db = await getDB();
  const tweets = await db.query('select * from Tweets');
  const tweets_keywords = await db.query('select * from Tweets_Keywords');
  console.log(tweets[0], tweets_keywords[0]);
};

syncDatabaseWtihBigQuery();

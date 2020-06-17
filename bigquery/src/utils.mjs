import GCloud from '@google-cloud/bigquery';
import moment from 'moment';
import fs from 'fs';

import Config from './config';

export const getBigQueryClient = () => {
  const { BigQuery } = GCloud;
  const { CredentialsFile, ProjectId } = Config;
  return new BigQuery({
    keyFilename: CredentialsFile,
    projectId: ProjectId,
  });
};

export const getInsertTweetsSql = tweets => {
  const tweetsSql = tweets.map(
    ({
      Id,
      UserId,
      Text,
      Lang,
      Nretweet,
      Nfavorite,
      Nreply,
      Nqoute,
      ParentId,
      ParentUserId,
      CreatedAt,
    }) => `
    (
      '${Id}',
      '${UserId}',
      ?,
      '${Lang}',
      ${Nretweet},
      ${Nfavorite},
      ${Nreply},
      ${Nqoute},
      ${ParentId},
      ${ParentUserId},
      '${moment(CreatedAt).format('YYYY-MM-DD HH:mm:ss')}',
      '${moment(CreatedAt).format('YYYY-MM-DD')}'
    )`
  );
  const insertSql = `
    insert into Tweets (
      Id,
      UserId,
      Text,
      Lang,
      Nretweet,
      Nfavorite,
      Nreply,
      Nqoute,
      ParentId,
      ParentUserId,
      CreatedAt,
      PartitionDate
    )
    values ${tweetsSql.join(',')};`;
  return insertSql;
};

export const query = async (bigquery, sql, params) => {
  try {
    const [job] = await bigquery.createQueryJob({
      query: sql,
      location: 'asia-southeast1',
      ...(params ? { params } : {}),
    });
    const [rows] = await job.getQueryResults();
    return rows;
  } catch (err) {
    console.error('query', err);
    throw err;
  }
};

export const writeTweetsJson = tweets => {
  try {
    const file = fs.createWriteStream('jsons/tweets.json', {
      encoding: 'utf8',
    });
    for (const tweet of tweets) {
      const {
        Id,
        UserId,
        Text,
        Lang,
        Nretweet,
        Nfavorite,
        Nreply,
        Nqoute,
        ParentId,
        ParentUserId,
        CreatedAt,
      } = tweet;
      const data = JSON.stringify({
        Id,
        UserId,
        Text,
        Lang,
        Nretweet,
        Nfavorite,
        Nreply,
        Nqoute,
        ParentId,
        ParentUserId,
        CreatedAt: moment(CreatedAt).format('YYYY-MM-DD HH:mm:ss'),
        PartitionDate: moment(CreatedAt).format('YYYY-MM-DD'),
      });
      file.write(data);
      file.write('\n');
    }
    file.end();
  } catch (err) {
    console.error('writeTweetsJson', err);
    throw err;
  }
};

export const writeTweetsKeywordsJson = tweets_keywords => {
  try {
    const file = fs.createWriteStream('jsons/tweets_keywords.json', {
      encoding: 'utf8',
    });
    for (const tweet_keyword of tweets_keywords) {
      const { TweetId, Keyword, CreatedAt } = tweet_keyword;
      const data = JSON.stringify({
        TweetId,
        Keyword,
        CreatedAt: moment(CreatedAt).format('YYYY-MM-DD HH:mm:ss'),
        PartitionDate: moment(CreatedAt).format('YYYY-MM-DD'),
      });
      file.write(data);
      file.write('\n');
    }
    file.end();
  } catch (err) {
    console.error('writeTweetsKeywordsJson', err);
    throw err;
  }
};

export const writeKeywordsJson = keywords => {
  try {
    const file = fs.createWriteStream('jsons/keywords.json', {
      encoding: 'utf8',
    });
    for (const keyword of keywords) {
      const data = JSON.stringify(keyword);
      file.write(data);
      file.write('\n');
    }
    file.end();
  } catch (err) {
    console.error('writeKeywordsJson', err);
    throw err;
  }
};

export const writeTopicsKeywordsJson = topicsKeywords => {
  try {
    const file = fs.createWriteStream('jsons/topicsKeywords.json', {
      encoding: 'utf8',
    });
    for (const topicKeyword of topicsKeywords) {
      const data = JSON.stringify(topicKeyword);
      file.write(data);
      file.write('\n');
    }
    file.end();
  } catch (err) {
    console.error('writeTopicsKeywordsJson', err);
    throw err;
  }
};

export const writeDomainsTopicsJson = domainsTopics => {
  try {
    const file = fs.createWriteStream('jsons/domainsTopics.json', {
      encoding: 'utf8',
    });
    for (const domainTopic of domainsTopics) {
      const data = JSON.stringify(domainTopic);
      file.write(data);
      file.write('\n');
    }
    file.end();
  } catch (err) {
    console.error('writeDomainsTopicsJson', err);
    throw err;
  }
};

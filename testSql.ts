import db from "./libs/db.ts";
const sql = `
  SELECT t.*, tk.Keywords
  FROM CUCovid.Tweets t
  LEFT JOIN (
    SELECT TweetId, GROUP_CONCAT(Keyword) AS Keywords
    FROM CUCovid.Tweets_Keywords
      GROUP BY TweetId
  ) tk
  ON t.Id = tk.TweetId
  LIMIT 10;
`;
const res = await db.query(sql);
console.log(res);

export interface Tweet {
  parent_id?: string;
  parent_user_id?: string;
  id: string;
  user_id: string;
  full_text: string;
  lang: string;
  retweet_count: number;
  favorite_count: number;
  reply_count: number;
  quote_count: number;
  created_at: string;
}

export interface DBTweets {
  ids: Set<string>;
  tweets: Tweet[];
}

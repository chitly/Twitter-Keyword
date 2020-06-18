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

export interface User {
  id: string;
  name: string;
  screen_name: string;
  location?: string;
  description: string;
  url?: string;
  followers_count: number;
  fast_followers_count: number;
  normal_followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  media_count: number;
  advertiser_account_type: string;
  created_at: string;
}

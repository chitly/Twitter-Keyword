# Twitter-Keyword
This project want to get the twitter posts by keyword and hashtag

## How to install
- install deno
https://deno.land/manual/getting_started/installation

## How to run
It has 3 arguments that you have to input.
- `-k` for keyword that you want to search
- `-s` for since date that you want to search (Format 'YYYY-MM-DD')
- `-u` for until date that you want tot seach (Format 'YYYY-MM-DD')

And run this command with 3 arguments.
```
deno run --allow-read --allow-net index.ts -k โควิด -s 2020-05-21 -u 2020-05-27
```
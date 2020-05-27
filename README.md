# Twitter-Keyword

This project want to get the twitter posts by keyword and hashtag

## How to install

- install deno
  https://deno.land/manual/getting_started/installation

## How to run

It has 4 arguments that you have to input.

- `-k` for keyword that you want to search (Delimiter: `,`)
- `-h` for hashtag that you want to search (Delimiter: `,`)
- `-s` for since date that you want to search (Format 'YYYY-MM-DD')
- `-u` for until date that you want tot seach (Format 'YYYY-MM-DD')

And run this command with the arguments.

Example 1: keyword `covid`

```
deno run --allow-read --allow-net index.ts -k covid -s 2020-05-21 -u 2020-05-27
```

Example 2: keyword `covid` and `covid19`

```
deno run --allow-read --allow-net index.ts -k covid,covid19 -s 2020-05-21 -u 2020-05-27
```

Example 3: keyword and hashtag `covid` and `covid19`

```
deno run --allow-read --allow-net index.ts -k covid,covid19 -h covid,covid19 -s 2020-05-21 -u 2020-05-27
```

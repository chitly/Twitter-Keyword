# Twitter-Keyword

This project want to get the twitter posts by keyword and hashtag

## How to install this project

- please install [deno](https://deno.land/manual/getting_started/installation)
- please install [docker](https://docs.docker.com/get-docker/)
- rename `.env.template` file to `.env` and you can change the confic as you want.

## How to run for collecting tweets

First, you have to turn on Database server with docker.

Please follow this command and wait a minute.

```
docker-compose up
```

After the Database server started, you can input command for running the collecting tweets script.

For the command of scirpt, it has 4 arguments that you have to input.

- `-k` for keyword that you want to search (Delimiter: `,`)
- `-l` for language that you want to search (Default: `th`)
- `-s` for since date that you want to search (Format: `YYYY-MM-DD`)
- `-u` for until date that you want tot seach (Format: `YYYY-MM-DD`)

For the examples of this command is belowed this line.

Example 1: keyword `covid`

```
deno run --allow-read --allow-net index.ts -k covid -s 2020-05-21 -u 2020-05-27
```

Example 2: keyword `covid` and `covid19`

```
deno run --allow-read --allow-net index.ts -k covid,covid19 -s 2020-05-21 -u 2020-05-27
```

Example 3: keyword and hashtag `covid` and `#covid19`

```
deno run --allow-read --allow-net index.ts -k covid,#covid19 -s 2020-05-21 -u 2020-05-27
```

## How to run test script for showing 10 collected tweets

```
deno run --allow-read --allow-net testSql.ts
```

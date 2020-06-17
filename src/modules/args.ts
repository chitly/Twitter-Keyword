import { parse } from 'https://deno.land/std/flags/mod.ts';
const args = parse(Deno.args);
const fullArgs: {
  keyword: string;
  language: string;
  since: string;
  until: string;
  topic: string;
  extend: boolean;
  all: boolean;
  saveInfo: boolean;
} = {
  keyword: args.k || args.keyword || '',
  language: args.l || args.language || 'th',
  since: args.s || args.since || '2020-01-01',
  until: args.u || args.until || '2020-05-31',
  topic: args.t || args.topic || '',
  extend: args.e || args.extend || false,
  all: args.a || args.all || false,
  saveInfo: args.i || args.saveInfo || false,
};
export default fullArgs;

import KerasJS from 'keras-js';

const CHAR_TYPE = {
  กขฃคฆงจชซญฎฏฐฑฒณดตถทธนบปพฟภมยรลวศษสฬอ: 'c',
  ฅฉผฟฌหฮ: 'n',
  ะาำิีืึุู: 'v', // า ะ ำ ิ ี ึ ื ั ู ุ
  เแโใไ: 'w',
  '่้๊๋': 't', // วรรณยุกต์ ่ ้ ๊ ๋
  '์ๆฯ.': 's', // ์  ๆ ฯ .
  '0123456789๑๒๓๔๕๖๗๘๙': 'd',
  '"': 'q',
  '‘': 'q',
  '’': 'q',
  "'": 'q',
  ' ': 'p',
  abcdefghijklmnopqrstuvwxyz: 's_e',
  ABCDEFGHIJKLMNOPQRSTUVWXYZ: 'b_e',
};

const CHAR_TYPE_FLATTEN = {};
for (let key in CHAR_TYPE) {
  const value = CHAR_TYPE[key];
  for (let i = 0; i < key.length; i++) {
    CHAR_TYPE_FLATTEN[key[i]] = value;
  }
}

const CHARS = [
  '\n',
  ' ',
  '!',
  '"',
  '#',
  '$',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '[',
  '\\',
  ']',
  '^',
  '_',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'other',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '}',
  '~',
  'ก',
  'ข',
  'ฃ',
  'ค',
  'ฅ',
  'ฆ',
  'ง',
  'จ',
  'ฉ',
  'ช',
  'ซ',
  'ฌ',
  'ญ',
  'ฎ',
  'ฏ',
  'ฐ',
  'ฑ',
  'ฒ',
  'ณ',
  'ด',
  'ต',
  'ถ',
  'ท',
  'ธ',
  'น',
  'บ',
  'ป',
  'ผ',
  'ฝ',
  'พ',
  'ฟ',
  'ภ',
  'ม',
  'ย',
  'ร',
  'ฤ',
  'ล',
  'ว',
  'ศ',
  'ษ',
  'ส',
  'ห',
  'ฬ',
  'อ',
  'ฮ',
  'ฯ',
  'ะ',
  'ั',
  'า',
  'ำ',
  'ิ',
  'ี',
  'ึ',
  'ื',
  'ุ',
  'ู',
  'ฺ',
  'เ',
  'แ',
  'โ',
  'ใ',
  'ไ',
  'ๅ',
  'ๆ',
  '็',
  '่',
  '้',
  '๊',
  '๋',
  '์',
  'ํ',
  '๐',
  '๑',
  '๒',
  '๓',
  '๔',
  '๕',
  '๖',
  '๗',
  '๘',
  '๙',
  '‘',
  '’',
  '\ufeff',
];

const CHARS_MAP = {};
for (let i = 0; i < CHARS.length; i++) {
  CHARS_MAP[CHARS[i]] = i;
}

const CHAR_TYPES = [
  'b_e',
  'c',
  'd',
  'n',
  'o',
  'p',
  'q',
  's',
  's_e',
  't',
  'v',
  'w',
];

const CHAR_TYPES_MAP = {};
for (let i = 0; i < CHAR_TYPES.length; i++) {
  CHAR_TYPES_MAP[CHAR_TYPES[i]] = i;
}

const model = new KerasJS.Model({
  filepath: 'src/assets/model_lite.bin',
  gpu: false,
  filesystem: true,
});

const gen_input = text => {
  const text_pad = `          ${text}          `.split('');
  const n = text.length;
  const n_pad = 10;

  const character_list = Array();
  for (let i = n_pad; i < n_pad + n; i++) {
    let a = text_pad.slice(i + 1, i + n_pad + 1);
    let b = text_pad.slice(i - n_pad, i).reverse();
    let c = text_pad.slice(i, i + 1);
    const char_list = a.concat(b).concat(c);
    character_list[i - n_pad] = char_list;
  }

  const X_char = Array();
  const X_type = Array();
  for (let i = 0; i < character_list.length; i++) {
    const characters = character_list[i];
    const x_char = Array();
    const x_type = Array();
    for (let j = 0; j < characters.length; j++) {
      let char_map = CHARS_MAP[characters[j]];
      if (typeof char_map == 'undefined') {
        char_map = 80;
      }

      let type = CHAR_TYPE_FLATTEN[characters[j]];
      if (typeof type == 'undefined') {
        type = 'o';
      }

      x_char[j] = char_map;
      x_type[j] = CHAR_TYPES_MAP[type];
    }
    X_char[i] = x_char;
    X_type[i] = x_type;
  }

  return { input_1: X_char, input_2: X_type };
};

const parse_prediction = (text, pred) => {
  const prediction = pred.slice(1).concat(1);

  const tokenized_text = Array();
  let count = 0;
  let word = '';
  for (let i = 0; i < text.length; i++) {
    word = `${word}${text[i]}`;
    if (prediction[i] > 0.5) {
      tokenized_text[count] = word;
      count = count + 1;
      word = '';
    }
  }
  return tokenized_text;
};

const predict = async text => {
  const input = gen_input(text);
  const predictions = [];
  for (let i = 0; i < text.length; i++) {
    const input_1 = new Float32Array(input['input_1'][i]);
    const input_2 = new Float32Array(input['input_2'][i]);
    const inputData = { input_1, input_2 };
    const output = await model.predict(inputData);
    predictions.push(output.dense_2[0]);
  }
  const result = parse_prediction(text, predictions);
  return result.join(' ').replace(/\s+/g, ' ');
};

const tokenizeWords = async text => {
  try {
    await model.ready();
    const result = await predict(text);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export default tokenizeWords;

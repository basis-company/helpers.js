import { capitalize } from './capitalize';

const digitGroupRe = /(\d)(?=(\d\d\d)+([^\d]|$))/g;

/**
 * Render currency number
 */
export function currency(v) {
  if (v) {
    if (v.toFixed) {
      v = v.toFixed(2);
    }

    v = v.replace('.', ',');
    v = v.replace(digitGroupRe, '$1\u2009'); // u+2009 - Thin Space
  }

  return v || '';
}

export function RUR(n) {
  return int2str(Math.floor(n), rur);
}

function int2str(n, template) {
  var a = [];

  template.forEach(row => {
    var gender = row[0];
    var one    = row[1];
    var two    = row[2];
    var five   = row[3];
    var zero   = row[4];

    var hunds  = n % 1000;
    var tens   = n % 100;
    var ones   = n % 10;

    if (hunds === 0) {
      if (zero) {
        a.unshift(five);

        if (n === 0) {
          a.unshift(zero);
        }
      }
    }
    else {
      switch (tens >= 20 ? ones : tens) {
        case 1:
          a.unshift(one);
          break;

        case 2:
        case 3:
        case 4:
          a.unshift(two);
          break;

        default:
          a.unshift(five);
      }

      unshift(a, 'frac20', tens >= 20 ? ones : tens, gender);

      if (tens >= 20) {
        unshift(a, 'tens', Math.floor(tens / 10));
      }

      unshift(a, 'hunds', Math.floor(hunds / 100));
    }

    n = Math.floor(n / 1000);
  });

  return capitalize(a.join(' '));
}

function unshift(a, dict, i, gender) {
  var word = ru[dict][i];

  if (word) {
    a.unshift(word[gender] || word);
  }
}

const ru = {
  hunds: [
    '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
    'шестьсот', 'семьсот', 'восемьсот', 'девятьсот',
  ],

  tens: [
    '', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
    'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто',
  ],

  frac20: [
    '',
    { male: 'один', female: 'одна' },
    { male: 'два',  female: 'две'  },
    'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять',
    'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
    'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать',
  ],
};

const rur = [
  [ 'male',   'рубль',    'рубля',     'рублей',    'ноль' ],
  [ 'female', 'тысяча',   'тысячи',    'тысяч'      ],
  [ 'male',   'миллион',  'миллиона',  'миллионов'  ],
  [ 'male',   'миллиард', 'миллиарда', 'миллиардов' ],
];

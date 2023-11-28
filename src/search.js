import has from 'underscore/modules/_has.js';
import isFunction from 'underscore/modules/isFunction.js';
import isNull from 'underscore/modules/isNull.js';
import isUndefined from 'underscore/modules/isUndefined.js';

// is/enable/disable parse query
var smart = true;

/**
 * Find 'query' in object 'o'
 */
export function search(o, query, excludeKeys) {
  if (query) {
    query = parseQuery(query);

    // if first word in query is invers like "-text"
    // then 'result' starts from 'true'
    var result = query[0] && query[0].invers;

    // find all query parts
    for (var i = 0; i < query.length; i++) {
      var piece = query[i];
      var found = inOwn(o, piece, excludeKeys);

      if (piece.adding) {
        result = result || found;
      }
      else {
        result = result && (found ^ piece.invers || piece.text === '');
      }
    }
  }
  else {
    result = true;
  }

  return result;
}

// find text in object
function inOwn(o, piece, excludeKeys) {
  var found = false;
  var v;

  for (var k in o) {
    if (!has(o, k)) {
      break;
    }

    var skip =
      excludeKeys && excludeKeys.indexOf(k) !== -1 ||
      isUndefined(v = o[k]) ||
      isNull(v) ||
      isFunction(v) ||
      (v = String(v).toLowerCase()) === '';

    if (!skip) {
      found =
        v.indexOf(piece.text) !== -1 ||
        v.indexOf(translatePiece(piece, 'ru-en')) !== -1 ||
        // v.indexOf(translate(text, 'ru'))    !== -1 ||
        // v.indexOf(translate(text, 'en'))    !== -1 ||
        false;

      if (found) {
        break;
      }
    }
  }

  return found;
}

// translate ghbdtn -> привет and so on ...
function translatePiece(piece, dir) {
  return piece[dir] || (piece[dir] = translate(piece.text, dir));
}

const charMap = {
  ru: {
    /* eslint-disable quote-props, key-spacing, quotes */
    'q':'й', 'w':'ц', 'e':'у', 'r':'к', 't':'е', 'y':'н', 'u':'г', 'i':'ш', 'o':'щ', 'p':'з', '[':'х',
    ']':'ъ', 'a':'ф', 's':'ы', 'd':'в', 'f':'а', 'g':'п', 'h':'р', 'j':'о', 'k':'л', 'l':'д', ';':'ж',
    "'":'э', 'z':'я', 'x':'ч', 'c':'с', 'v':'м', 'b':'и', 'n':'т', 'm':'ь', ',':'б', '.':'ю', '/':'.',
    /* eslint-enable quote-props, key-spacing, quotes */
  },
  en: {},
};

// reverse map
for (var k in charMap.ru) {
  charMap.en[charMap.ru[k]] = k;
}

// cache last translated
const lastTrans = {};

function translate(text, dir) {
  if (!lastTrans[dir]) {
    lastTrans[dir] = {};
  }

  if (lastTrans[dir].text !== text) {
    var langs = dir.split('-');
    var lang1 = langs.shift();
    var lang2 = langs.shift();

    lastTrans[dir] = {
      text,
      result: text
        .split('')
        .map(char => charMap[lang1][char] || lang2 && charMap[lang2][char] || char)
        .join(''),
    };
  }

  return lastTrans[dir].result;
}

// cache last lowercase query
const lastQuery = {};

// parse new query or return last cached
function parseQuery(query) {
  if (lastQuery.query !== query) {
    lastQuery.query = query;
    query = String(query).toLowerCase();

    lastQuery.parsed = smart ?
      query
        .split(' ')
        .map(parsePart)
        .filter(Boolean)
        .sort(sortPart) :
      [
        { text: query, adding: true },
      ];
  }

  return lastQuery.parsed;
}

// get query part meta info
function parsePart(part, i) {
  if (part === '') {
    return;
  }

  var invers = part[0] === '-';
  var adding = part[0] === '+';

  if (invers || adding) {
    part = part.slice(1);
  }

  return { // piece
    text: part,
    invers,
    adding: adding || i === 0 && !invers,
  };
}

function sortPart(a, b) {
  // eslint-disable-next-line no-nested-ternary
  return a.adding === b.adding ? 0 : a.adding ? -1 : 1;
}

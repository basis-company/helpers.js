# helpers.js
shared javascript toolkit

### install

```shell
npm install basis-company/helpers.js
```

### gulpfile.js
```js
var esbuild = require('gulp-esbuild');

gulp.task('helpers', () =>
  gulp.src('src/js/helpers/index.js')
    .pipe(esbuild({
      bundle: true,
      charset: 'utf8',
      minify: true,
      outfile: 'helpers.js',
    }))
    .pipe(gulp.dest('build'))
);
```

### index.html
```html
<script type="text/javascript" src="build/helpers.js"></script>
```

### index.js
```js
// add required
import { applyOwnIf } from 'helpers/apply';
import { capture } from 'helpers/capture';
import { fields } from 'helpers/fields';
import { debug, log, raise, warn } from 'helpers/log';
// ...

// inline some stuff
import './dispatch.js';
import './msg.js';

// restore module state from localStorage
restore(log, 'wop-log');

// module startup
capture.init({ toast });

// extend another class
applyOwnIf(Ext.Base.prototype, {
  raise,
  warn,
  log,
  debug,
});

// bind to global
applyOwnIf(myGlobalVar, {
  applyOwnIf, capture, fields, log,
});

function restore(feature, name) {
  var e = feature.enable;
  var d = feature.disable;
  var ls;

  if ((ls = window.localStorage)) {
    feature.enable = function(level) {
      ls.setItem(name, e(level));
    };

    feature.disable = function() {
      d(ls.removeItem(name));
    };

    e(+ls.getItem(name));
  }
}

function toast(params) {
  new MyToast({
    autoCloseDelay: 7 * 1000,
    autoShow: true,
    html: [
      params.type,
      params.message,
      '',
      params.trace,
    ]
      .join('\n')
      .replace(/https?:.*\//g, '')
      .replace(/\r?\n/g, '<br/>'),
  });
}
```

### contents

#### string
```js
capitalize(s)
```

#### number
```js
constrain(n, min, max)
round1(n)
round2(n)
```

#### array
```js
append(a = [])
array(a = [])
countBy(a, k)
fields(columns, ...add)
groupBy(a, k, v)
indexBy(a, k, v)
partition(a, fn)
prepend(a = [])
remove(a, v, all)
transform(a, fn, buf = [])
uniq(a)
```

#### object
```js
applyOwn(o, del, ...overrides)
applyOwnIf(o, del, ...defaults)
applyTo(dst, src, ...keys)
copyOwn(o, del, ...overrides)
copyOwnIf(o, del, ...defaults)
create(proto, ...overrides)
empty(o)
get(o, path, defaults)
inc(o, k, delta = 1)
isObject(o)
ns(o, k1, k2, ...)
push(o, k, v)
```

#### function
```js
buffer(name, item, fn, scope, delay)
memoize(fn, hasher)
portion(name, total, aborted, fn)
```

#### date
```js
shortDayNames = [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ];

clearTime(date)
date(ymd, hms)
days(begin, end) // elapsed
dmy(ymd)
forEachDay(begin, end, fn)
genitiveYmd(ymd)
hm(hms)
next(ymd)
now()
prev(ymd)
seconds(begin, end) // elapsed
shift(a, tagged)
timestamp(ts)
ymd(date)
ymdhms(ymd, hms)
```

#### cookie
```js
canary(enable, days = 7)
```

#### logger
```js
capture(mixed)
debug()
log()
measure(name, fn, scope, args)
raise()
warn()
```

#### promise
```js
sleep(ms)
```

#### renderer
```js
checkbox(v)
currency(v)
phone(v)
rating(v)
remain(seconds)
RUR(n)
snils(v)
```

#### text
```js
copyExecCommand(text)
metrics(prometheus)
search(o, query, excludeKeys)
```

#### csv
```js
csvBlob(s)
csvDecode(s)
csvEncode(a)
download(blob, filename)
upload(file)
```

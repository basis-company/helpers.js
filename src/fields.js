import { append } from './append';
import { uniq } from './uniq';

/**
 * @return {array} dataIndex from columns
 */
export function fields(columns, ...add) {
  var buf = [];

  _fields(columns, buf);
  append(buf, add);

  return uniq(buf);
}

function _fields(columns, buf) {
  (columns.items || columns).forEach(column => {
    if (column.columns) {
      _fields(column.columns, buf);
    }
    else if (column.dataIndex) {
      buf.push(column.dataIndex);
    }
  });
}

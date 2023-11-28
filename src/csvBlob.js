const typeUtf8 = { type: 'text/csv;charset=utf-8' };

export function csvBlob(s) {
  return new Blob([ '\ufeff' + s ], typeUtf8);
}

export function download(blob, filename) {
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');

  a.setAttribute('href', url);

  if (filename) {
    a.setAttribute('download', filename);
  }

  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

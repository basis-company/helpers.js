export function upload(file) {
  var reader = new FileReader();

  return new Promise(resolve => {
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });
}

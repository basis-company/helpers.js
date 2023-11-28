var dom;

/**
 * Copy text to clipboard
 */
export function copyExecCommand(text) {
  if (!dom) {
    init();
  }

  dom.innerHTML = text;

  var sel   = window.getSelection();
  var range = document.createRange();

  sel.removeAllRanges();
  range.selectNode(dom);
  sel.addRange(range);

  try {
    document.execCommand('copy');
  }
  finally {
    sel.removeAllRanges();
    dom.innerHTML = '';
  }
}

function init() {
  dom = document.createElement('div');

  dom.style.width  = 0;
  dom.style.height = 0;

  document.body.appendChild(dom);
}

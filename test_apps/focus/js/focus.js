function accept(node) {
  var typed = node.textContent.trim();
  var clone;

  if (node === document.body) {
    node = list.lastElementChild;
  }

  if (!typed) {
    return;
  }

  node.contentEditable = false;

  clone = node.cloneNode();
  clone.textContent = '';
  clone.contentEditable = true;

  node.parentNode.appendChild(clone);

  focus(clone);
}

function focus(node) {
  var range = document.createRange();
  var selection = window.getSelection();
  var value = node.textContent.trim();


  node.contentEditable = true;

  range.selectNodeContents(node);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);

  node.focus();
}

var list = document.getElementById('list');
var content = list.firstElementChild;




[].forEach.call(document.querySelectorAll('button'), function(button) {
  button.onclick = function(event) {
    var clone;

    if (button.id === 'focus') {
      focus(content);
    }
    if (button.id === 'accept') {
      accept(document.activeElement);
    }
  };
});


list.addEventListener('keypress', function(event) {
  var keyCode = event.keyCode;
  var target = event.target;
  var typed = target.textContent.trim();
  var previous;

  if (target.parentNode === list) {
    if (keyCode === event.DOM_VK_BACK_SPACE) {

      if (target.contentEditable && !typed) {
        previous = target.previousSibling;

        target.parentNode.removeChild(target);

        focus(previous);

        event.preventDefault();
      }
    }
    if (
      (keyCode === 13 || keyCode === event.DOM_VK_ENTER) ||
      (keyCode === event.DOM_VK_TAB)
    ) {

      accept(target);
      event.preventDefault();

    }
  }
});

focus(content);

window.addEventListener('load', start);

// var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var globalNames = [];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  preventFormSubmit();
  inputName = document.querySelector('#input');
  activateForm();
  Render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateForm() {
  function insertName(typedName) {
    globalNames.push(typedName);
    event.target.value = '';
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
    event.target.value = '';
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        newName = event.target.value;
        updateName(newName);
      } else {
        typedName = event.target.value;
        insertName(typedName);
      }
      isEditing = false;
      Render();
    }
  }
  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function Render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      Render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, i) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = i;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divNames.appendChild(ul);
}

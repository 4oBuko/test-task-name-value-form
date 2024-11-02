const addButton = document.getElementById("add-pair");
const sortByNameButton = document.getElementById("sort-by-name");
const sortByValueButton = document.getElementById("sort-by-value");
const deleteButton = document.getElementById("delete");

let storage = new Map();

// Regex checks if the string contains only alphanumeric symbols
const regex = /^[a-zA-Z0-9]+$/;
const separator = "=";

addButton.onclick = function () {
  let input = document.getElementById("key-value").value;
  let [key, value] = input.split(separator);
  if (!input) {
    // no actions if input is empty
    return;
  }
  key = key.trim();
  value = value.trim();
  const errorMessage = document.getElementById("error-message");
  if (regex.test(key) && regex.test(value)) {
    storage.set(key, value);
    document.getElementById("key-value").value = "";
    if (errorMessage) {
      errorMessage.remove();
    }
    showItems();
  } else {
    const form = document.getElementById("input-form");
    if (!errorMessage) {
      const errorMessage = document.createElement("p");
      errorMessage.innerHTML = "Invalid input. use name=value format";
      errorMessage.id = "error-message";
      form.appendChild(errorMessage);
    }
  }
};

sortByNameButton.onclick = function () {
  storage = new Map(
    [...storage.entries()].sort((a, b) => {
      return a[0].localeCompare(b[0]);
    })
  );
  showItems();
};

sortByValueButton.onclick = function () {
  storage = new Map(
    [...storage.entries()].sort((a, b) => {
      return a[1].localeCompare(b[1]);
    })
  );
  showItems();
};

deleteButton.onclick = function () {
  const container = document.getElementById("key-value-container");
  const checkboxes = container.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  if (checkboxes.length > 0) {
    checkboxes.forEach((checkbox) => {
      storage.delete(checkbox.value);
      container.removeChild(checkbox.nextSibling);
      container.removeChild(checkbox);
    });
    showItems();
  }
};

function showItems() {
  const container = document.getElementById("key-value-container");
  //   clear previous elements
  container.innerHTML = "";
  storage.forEach((value, key) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `pair-${key}`;
    checkbox.value = `${key}`;

    const label = document.createElement("label");
    label.htmlFor = `pair-${key}`;
    label.textContent = `${key}${separator}${value}`;

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

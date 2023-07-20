import _ from 'lodash';
import './index.css';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());

// index.js
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTaskInput');
const addButton = document.getElementById('addButton');
// const clearCompletedButton = document.getElementById('clearCompletedButton');

// Function to render the tasks list
function renderTasks() {
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index); // Sort tasks by index

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.id = `taskList-${task.index}`; // Set the correct id for each list item
    listItem.classList.toggle('completed', task.completed);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const descriptionSpan = document.createElement('span');
    descriptionSpan.classList.add('description'); // Add class for the description span
    descriptionSpan.textContent = task.description;

    // Create the edit icon
    const editIcon = document.createElement('span');
    editIcon.classList.add('edit-icon');
    editIcon.textContent = '✏️';
    // eslint-disable-next-line no-use-before-define
    editIcon.addEventListener('click', () => editTask(task.index));

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add('edit-input');
    inputElement.style.display = 'none';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    // eslint-disable-next-line no-use-before-define
    removeButton.addEventListener('click', () => removeTask(task.index));

    listItem.appendChild(checkbox);
    listItem.appendChild(descriptionSpan);
    listItem.appendChild(editIcon);
    listItem.appendChild(inputElement);
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
  });

  // Store tasks in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask(description) {
  const index = tasks.length > 0 ? tasks[tasks.length - 1].index + 1 : 1;
  tasks.push({ description, completed: false, index });
  renderTasks();
}

// Function for updating the indexes.
function updateTaskIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

// Function to remove a task
function removeTask(index) {
  const taskIndex = tasks.findIndex((task) => task.index === index);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    updateTaskIndexes();
    renderTasks();
  }
}

// Function to edit a task
function editTask(index) {
  const taskIndex = tasks.findIndex((task) => task.index === index);
  if (taskIndex !== -1) {
    const listItem = document.getElementById(`taskList-${index}`);
    const descriptionSpan = listItem.querySelector('.description');
    const editIcon = listItem.querySelector('.edit-icon');
    const inputElement = listItem.querySelector('.edit-input');

    // Show the input element and set its value to the task description
    inputElement.style.display = 'inline-block';
    inputElement.value = tasks[taskIndex].description;
    inputElement.focus();

    // Hide the description span and edit icon during editing
    descriptionSpan.style.display = 'none';
    editIcon.style.display = 'none';

    // Save changes when the input loses focus
    // eslint-disable-next-line no-use-before-define
    inputElement.addEventListener('blur', () => saveChanges(index));
  }
}

// Function to save changes when editing a task
function saveChanges(index) {
  const taskIndex = tasks.findIndex((task) => task.index === index);
  if (taskIndex !== -1) {
    const listItem = document.getElementById(`taskList-${index}`);
    const descriptionSpan = listItem.querySelector('.description');
    const editIcon = listItem.querySelector('.edit-icon');
    const inputElement = listItem.querySelector('.edit-input');

    tasks[taskIndex].description = inputElement.value.trim();
    inputElement.style.display = 'none';
    descriptionSpan.textContent = tasks[taskIndex].description;
    descriptionSpan.style.display = 'inline-block';
    editIcon.style.display = 'inline-block';

    renderTasks();
  }
}

// Event listener for the add button
addButton.addEventListener('click', () => {
  const newTaskDescription = newTaskInput.value.trim();
  if (newTaskDescription) {
    addTask(newTaskDescription);
    newTaskInput.value = '';
  }
});

// Event listener for the clear completed button
// clearCompletedButton.addEventListener('click', clearCompletedTasks);
// Initial rendering of the tasks
renderTasks();

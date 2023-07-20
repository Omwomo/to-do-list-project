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
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTaskInput');
const addButton = document.getElementById('addButton');
const clearCompletedButton = document.getElementById('clearCompletedButton');

// Function to render the tasks list
function renderTasks() {
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index); // Sort tasks by index

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
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
    // eslint-disable-next-line no-use-before-define
    // descriptionSpan.addEventListener('click', () => editTask(task.index));

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add('edit-input');
    inputElement.style.display = 'none';
    // eslint-disable-next-line no-use-before-define
    // inputElement.addEventListener('blur', saveChanges);
    // eslint-disable-next-line no-use-before-define
    // inputElement.addEventListener('keypress', handleKeyPress);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    // eslint-disable-next-line no-use-before-define
    removeButton.addEventListener('click', () => removeTask(task.index));

    listItem.appendChild(checkbox);
    listItem.appendChild(descriptionSpan);
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

// Function to clear all completed tasks
function clearCompletedTasks() {
  // Create a new array with only the uncompleted tasks
  const uncompletedTasks = tasks.filter((task) => !task.completed);

  // Update the tasks array with uncompletedTasks
  tasks = uncompletedTasks;

  // Reassign the index values based on the new array's order
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });

  renderTasks();
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
clearCompletedButton.addEventListener('click', clearCompletedTasks);
// Initial rendering of the tasks
renderTasks();

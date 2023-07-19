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

// Sample data for the tasks array
const tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  // Add more tasks here as needed
];

const taskList = document.getElementById('taskList');
// const newTaskInput = document.getElementById('newTaskInput');
// const addButton = document.getElementById('addButton');
// const clearCompletedButton = document.getElementById('clearCompletedButton');

// Function to render the tasks list
function renderTasks() {
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index); // Sort tasks by index

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = task.description;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    // eslint-disable-next-line no-use-before-define
    // removeButton.addEventListener('click', () => removeTask(task.index));

    listItem.appendChild(checkbox);
    listItem.appendChild(descriptionSpan);
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);
  });
}

// Initial rendering of the tasks
renderTasks();

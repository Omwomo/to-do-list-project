import './index.css';
import TaskManager from './modules/taskManager.js';

const taskManager = new TaskManager();

// Event listener for the add button
document.getElementById('addButton').addEventListener('click', (e) => {
  e.preventDefault();
  const newTaskDescription = document.getElementById('newTaskInput').value.trim();
  if (newTaskDescription) {
    taskManager.addTask(newTaskDescription);
    document.getElementById('newTaskInput').value = '';
  }
});

const clearCompletedTasksButton = document.getElementById('clearCompletedButton');
// Adding event listener for completed tasks
clearCompletedTasksButton.addEventListener('click', () => {
  taskManager.clearCompletedTasks();
});

// Initial rendering of the tasks
taskManager.renderTasks();

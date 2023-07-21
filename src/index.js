import './index.css';
import TaskManager from './modules/taskManager.js';

const taskManager = new TaskManager();

// Event listener for the add button
document.getElementById('addButton').addEventListener('click', () => {
  const newTaskDescription = document.getElementById('newTaskInput').value.trim();
  if (newTaskDescription) {
    taskManager.addTask(newTaskDescription);
    document.getElementById('newTaskInput').value = '';
  }
});

// Initial rendering of the tasks
taskManager.renderTasks();

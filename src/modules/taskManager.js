// TaskManager.js
import Task from './Task';

export default class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.taskList = document.getElementById('taskList');
  }

  renderTasks() {
    this.taskList.innerHTML = '';

    this.tasks.sort((a, b) => a.index - b.index);

    this.tasks.forEach((task) => {
      const listItem = document.createElement('li');
      listItem.id = `taskList-${task.index}`;
      listItem.classList.toggle('completed', task.completed);

      const checkboxContainer = document.createElement('label');
      checkboxContainer.classList.add('custom-checkbox');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        this.updateTasksList();
      });

      const checkmark = document.createElement('span');
      checkmark.classList.add('checkmark');

      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(checkmark);

      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add('description');
      descriptionSpan.textContent = task.description;

      const editIcon = document.createElement('span');
      editIcon.classList.add('icon-edit');
      editIcon.addEventListener('click', () => this.editTask(task.index));

      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.classList.add('edit-input');
      inputElement.style.display = 'none';
      inputElement.addEventListener('blur', () => this.saveChanges(task.index));

      const removeButton = document.createElement('span');
      removeButton.classList.add('icon-trash');
      removeButton.addEventListener('click', () => this.removeTask(task.index));

      listItem.appendChild(checkboxContainer);
      listItem.appendChild(descriptionSpan);
      listItem.appendChild(editIcon);
      listItem.appendChild(inputElement);
      listItem.appendChild(removeButton);
      this.taskList.appendChild(listItem);
    });

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(description) {
    const index = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].index + 1 : 1;
    this.tasks.push(new Task(description, false, index));
    this.updateTasksList();
  }

  updateTasksList() {
    this.updateTaskIndexes();
    this.renderTasks();
  }

  updateTaskIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  removeTask(index) {
    const taskIndex = this.tasks.findIndex((task) => task.index === index);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.updateTasksList();
    }
  }

  editTask(index) {
    const taskIndex = this.tasks.findIndex((task) => task.index === index);
    if (taskIndex !== -1) {
      const listItem = document.getElementById(`taskList-${index}`);
      const descriptionSpan = listItem.querySelector('.description');
      const editIcon = listItem.querySelector('.icon-edit');
      const inputElement = listItem.querySelector('.edit-input');

      inputElement.style.display = 'inline-block';
      inputElement.value = this.tasks[taskIndex].description;
      inputElement.focus();

      descriptionSpan.style.display = 'none';
      editIcon.style.display = 'none';

      inputElement.addEventListener('blur', () => this.saveChanges(index));

      inputElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.saveChanges(index);
        }
      });
    }
  }

  saveChanges(index) {
    const taskIndex = this.tasks.findIndex((task) => task.index === index);
    if (taskIndex !== -1) {
      const listItem = document.getElementById(`taskList-${index}`);
      const descriptionSpan = listItem.querySelector('.description');
      const editIcon = listItem.querySelector('.icon-edit');
      const inputElement = listItem.querySelector('.edit-input');

      const newDescription = inputElement.value.trim();
      if (newDescription) {
        this.tasks[taskIndex].description = newDescription;
        descriptionSpan.textContent = this.tasks[taskIndex].description;
      }

      inputElement.style.display = 'none';
      descriptionSpan.style.display = 'inline-block';
      editIcon.style.display = 'inline-block';

      this.updateTasksList();
    }
  }

  clearCompletedTasks() {
    const uncompletedTasks = this.tasks.filter((task) => !task.completed);
    this.tasks = uncompletedTasks;

    this.updateTaskIndexes();

    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.renderTasks();
  }
}

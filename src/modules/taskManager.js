export default class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.taskList = document.getElementById('taskList');
  }

  // Function to render the tasks list
  renderTasks() {
    this.taskList.innerHTML = '';

    this.tasks.sort((a, b) => a.index - b.index); // Sort tasks by index

    this.tasks.forEach((task) => {
      const listItem = document.createElement('li');
      listItem.id = `taskList-${task.index}`;
      listItem.classList.toggle('completed', task.completed);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        this.updateTasksList();
      });

      const checkboxContainer = document.createElement('span');
      checkboxContainer.classList.add('checkbox-container');
      checkboxContainer.appendChild(checkbox);

      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add('description');
      descriptionSpan.textContent = task.description;

      const editIcon = document.createElement('span');
      editIcon.classList.add('icon-edit');
      // editIcon.textContent = '✏️';
      editIcon.addEventListener('click', () => this.editTask(task.index));

      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.classList.add('edit-input');
      inputElement.style.display = 'none';
      inputElement.addEventListener('blur', () => this.saveChanges(task.index));

      const removeButton = document.createElement('span');
      // removeButton.innerHTML = '🗑️';
      removeButton.classList.add('icon-trash');
      removeButton.addEventListener('click', () => this.removeTask(task.index));

      listItem.appendChild(checkboxContainer);
      listItem.appendChild(descriptionSpan);
      listItem.appendChild(editIcon);
      listItem.appendChild(inputElement);
      listItem.appendChild(removeButton);
      this.taskList.appendChild(listItem);
    });

    // Store tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Function to add a new task
  addTask(description) {
    const index = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].index + 1 : 1;
    this.tasks.push({ description, completed: false, index });
    this.updateTasksList();
  }

  // Function to update the task list and render the tasks
  updateTasksList() {
    this.updateTaskIndexes();
    this.renderTasks();
  }

  // Function for updating the indexes.
  updateTaskIndexes() {
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  // Function to remove a task
  removeTask(index) {
    const taskIndex = this.tasks.findIndex((task) => task.index === index);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.updateTasksList();
    }
  }

  // Function to edit a task
  editTask(index) {
    const taskIndex = this.tasks.findIndex((task) => task.index === index);
    if (taskIndex !== -1) {
      const listItem = document.getElementById(`taskList-${index}`);
      const descriptionSpan = listItem.querySelector('.description');
      const editIcon = listItem.querySelector('.icon-edit');
      const inputElement = listItem.querySelector('.edit-input');

      // Show the input element and set its value to the task description
      inputElement.style.display = 'inline-block';
      inputElement.value = this.tasks[taskIndex].description;
      inputElement.focus();

      // Hide the description span and edit icon during editing
      descriptionSpan.style.display = 'none';
      editIcon.style.display = 'none';

      // Save changes when the input loses focus
      inputElement.addEventListener('blur', () => this.saveChanges(index));

      inputElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.saveChanges(index);
        }
      });
    }
  }

  // Helper function: Save changes when editing a task
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
    // Create a new array with only the uncompleted tasks
    const uncompletedTasks = this.tasks.filter((task) => !task.completed);

    // Update the tasks array with uncompletedTasks
    this.tasks = uncompletedTasks;

    // Reassign the index values based on the new array's order
    this.tasks.forEach((task, index) => {
      task.index = index + 1;
    });

    // Store the updated tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.renderTasks();
  }
}

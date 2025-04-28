const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  taskList.appendChild(li);

  taskInput.value = ''; // Clear input
}

taskList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
});

taskList.addEventListener('click', function(e) {
  if (e.target.tagName === 'SPAN') {
    e.target.classList.toggle('completed');
  }
});

function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem('tasks') || '';
}

addTaskBtn.addEventListener('click', saveTasks);
taskList.addEventListener('click', saveTasks);

window.addEventListener('DOMContentLoaded', loadTasks);


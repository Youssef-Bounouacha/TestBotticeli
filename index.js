// Récupération des éléments HTML
const form = document.querySelector('form');
const input = document.querySelector('#new-task');
const intro = document.querySelector('#intro');
const statusDropdown = document.getElementById('statusDropdown');
const taskList = document.getElementById('task-list');

// Tableau pour stocker les tâches
let tasks = [];

// Ajout d'un événement pour soumettre le formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = input.value.trim();
  if (taskName !== '') {
    const task = {
      name: taskName,
      done: false
    };
    tasks.push(task);
    input.value = '';
    intro.style.display = 'none';
    renderTasks();
  }
});

// Fonction pour afficher les tâches
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      tasks[index].done = checkbox.checked;
      renderTasks();
    });
    const span = document.createElement('span');
    span.textContent = task.name;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });
    const editButton = document.createElement('button');
    editButton.textContent = 'Editer';
    editButton.addEventListener('click', () => {
      const newTaskName = prompt('Nouveau nom de la tâche :', task.name);
      if (newTaskName !== null && newTaskName.trim() !== '') {
        tasks[index].name = newTaskName.trim();
        renderTasks();
      }
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    taskList.appendChild(li);
  });
}

// Fonction pour trier les tâches
function filterTasksByStatus() {
  const status = statusDropdown.querySelector('.active').getAttribute('data-status');
  const tasks = Array.from(taskList.children);
  
  tasks.forEach(task => {
    const isDone = task.querySelector('input[type="checkbox"]').checked;
    task.style.display = filterTask(isDone, status) ? 'block' : 'none';
  });
}

function filterTask(isDone, status) {
  if (status === 'all') {
    return true;
  } else if (status === 'done' && isDone) {
    return true;
  } else if (status === 'active' && !isDone) {
    return true;
  } else {
    return false;
  }
}

statusDropdown.addEventListener('click', event => {
  if (event.target.tagName === 'A') {
    const links = Array.from(statusDropdown.querySelectorAll('a'));
    links.forEach(link => {
      if (link === event.target) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    filterTasksByStatus();
  }
});

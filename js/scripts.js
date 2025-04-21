const formElement = document.getElementById('form');
const inputElement = document.getElementById('input');

const taskItemElement = document.getElementById('task-item');
const itemsLeftTextElement = document.getElementById('items-left-text');
const clearCompletedButtonElement = document.getElementById(
  'clear-completed-button'
);

const headerElement = document.getElementById('header')
const bodyElement = document.getElementById('body')
const turnModeButtonElement = document.getElementById('turn-mode-button')
const rootStyles = document.documentElement.style

const taskListElement = document.getElementById('task-list');

const filtersElement = document.getElementById('filters');

let tasksList = [
  {
    id: Date.now(),
    name: 'Define your taks',
    completed: false
  }
];

let listSelected = '';
let darkMode = false;

const createNewTask = event => {
  event.preventDefault();

  let newTask = {
    id: Date.now(),
    name: inputElement.value,
    completed: false
  };

  tasksList.push(newTask);

  inputElement.value = '';
  insertTask(tasksList);
};

const clearCompletedTasks = () => {
  tasksList = tasksList.filter(task => {
    return !task.completed;
  });

  insertTask(tasksList);
};

const deleteTasks = id => {
  tasksList = tasksList.filter(task => {
    return task.id !== id;
  });
  insertTask(tasksList);
};

const completedTasks = id => {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id === id) {
      tasksList[i].completed = !tasksList[i].completed;
    }
  }
  insertTask(tasksList);
};

const itemsLeft = () => {
  const activeItems = tasksList.filter(task => !task.completed);

  if (activeItems.length > 0) {
    itemsLeftTextElement.textContent = `${activeItems.length} items left`;
  } else itemsLeftTextElement.textContent = `No tasks`;
};

const insertTask = (list) => {
  //el contenedor general se resetea para pintar de nuevo los divs.
  taskListElement.textContent = '';
  list.forEach(taskItem => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.classList.add('task-item');
    task.id = taskItem.name;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-text');
    checkbox.classList.add('checkbox-input');
    checkbox.id = taskItem.id;
    checkbox.checked = taskItem.completed;
    checkbox.addEventListener('change', () => completedTasks(taskItem.id));

    const circle = document.createElement('label');
    circle.classList.add('checkbox-circle');
    //GUARDAR QUE ASÍ ES COMO SE PONE EL FOR PRA ENLAZARLO
    circle.htmlFor = taskItem.id;
    circle.textContent = taskItem.name;

    const eliminateButton = document.createElement('button');
    eliminateButton.classList.add('eliminate-task-button');
    eliminateButton.textContent = 'x';
    eliminateButton.addEventListener('click', () => deleteTasks(taskItem.id));

    task.append(checkbox);
    task.append(circle);
    task.append(eliminateButton);
    taskListElement.append(task);
  });

  itemsLeft();
};

const filterList = event => {
  listSelected = event.target.dataset.filter;
  const amountFilters = filtersElement.children.length;

  //se supone que aquí hay que usar el data para quitar y poner el color?
  for (let i = 0; i < amountFilters; i++) {
    filtersElement.children[i].classList.remove('button-selected');
  }
  event.target.classList.add('button-selected');

  let active = []
  let completed = []

  tasksList.filter(task => {
    !task.completed ? active.push(task) : completed.push(task)
  })
  
  if (listSelected === 'all'){
    insertTask(tasksList)
  } else if (listSelected === 'active'){
    insertTask(active)
  } else {insertTask(completed)}
  console.log(active);
  
};

const changeMode = () => {
  //se supone que tiene que ser tan largo?
  darkMode = !darkMode

  if (darkMode){
    turnModeButtonElement.src = './assets/images/icon-sun.svg'

    rootStyles.setProperty('--primary-color', '#25273D')
    rootStyles.setProperty('--secondary-color', '#C8CBE7')
    rootStyles.setProperty('--unselected-color', '#5B5E7E')
    rootStyles.setProperty('--shadow', '0 2.1875rem 3.125rem -0.9375rem rgba(0, 0, 0, 0.5)')

    headerElement.classList.add('dark')
    bodyElement.classList.add('dark-background')

  } else {
    turnModeButtonElement.src = './assets/images/icon-moon.svg'

    rootStyles.setProperty('--primary-color', '#FFFFFF')
    rootStyles.setProperty('--secondary-color', '#494C6B')
    rootStyles.setProperty('--unselected-color', '#9495A5')
    rootStyles.setProperty('--shadow', '0 2.1875rem 3.125rem -0.9375rem rgba(194, 195, 214, 0.5)')

    headerElement.classList.remove('dark')
    bodyElement.classList.remove('dark-background')
  }

}

insertTask(tasksList);


turnModeButtonElement.addEventListener('click', changeMode)
clearCompletedButtonElement.addEventListener('click', clearCompletedTasks);
filtersElement.addEventListener('click', filterList);
formElement.addEventListener('submit', createNewTask);
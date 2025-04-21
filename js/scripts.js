const formElement = document.getElementById('form');
const inputElement = document.getElementById('input');

const taskItemElement = document.getElementById('task-item');
const itemsLeftTextElement = document.getElementById('items-left-text');
const clearCompletedButtonElement = document.getElementById(
  'clear-completed-button'
);

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

const createNewTask = event => {
  event.preventDefault();

  let newTask = {
    id: Date.now(),
    name: inputElement.value,
    completed: false
  };

  tasksList.push(newTask);

  inputElement.value = '';
  insertTask();
};

const clearCompletedTasks = () => {
  tasksList = tasksList.filter(task => {
    return !task.completed;
  });

  insertTask();
};

const deleteTasks = id => {
  tasksList = tasksList.filter(task => {
    return task.id !== id;
  });
  insertTask();
};

const completedTasks = id => {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id === id) {
      tasksList[i].completed = !tasksList[i].completed;
    }
  }

  insertTask();
};

const itemsLeft = () => {
  const activeItems = tasksList.filter(task => !task.completed);

  if (activeItems.length > 0) {
    itemsLeftTextElement.textContent = `${activeItems.length} items left`;
  } else itemsLeftTextElement.textContent = `No tasks`;
};

const insertTask = () => {
  //el contenedor general se resetea para pintar de nuevo los divs.
  taskListElement.textContent = '';
  tasksList.forEach(taskItem => {
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

  //   const removeTask = id => {
  //     tasksList = tasksList.filter(task => {
  //       return task.id !== id;
  //     });
  //   };

  console.log(event.target.dataset.filter);
  console.log(taskListElement.children);

  console.log(tasksList);
  insertTask();
};

insertTask();

clearCompletedButtonElement.addEventListener('click', clearCompletedTasks);
filtersElement.addEventListener('click', filterList);
formElement.addEventListener('submit', createNewTask);

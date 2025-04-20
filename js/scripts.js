const formElement = document.getElementById('form')
const inputElement = document.getElementById('input')
const taskItemElement = document.getElementById('task-item')
const itemsLeftTextElement = document.getElementById('items-left-text')

const taskListElement = document.getElementById('task-list')

const filtersElement = document.getElementById('filters')

const all = [];

let active = []
let completed = []
let listSelected = ''


const createNewTask = () => {
    event.preventDefault()

   let newTask = {
    id: Date.now(),
    name: inputElement.value,
    completed: false,
    } 
    all.push(newTask)
    active.push(newTask)

    insertTask()
}
console.log(all);

const insertTask = () => {
    //el contenedor general se resetea para pintar de nuevo los divs.
    taskListElement.textContent = "",

    all.forEach(taskItem => {

    const task = document.createElement('div')
    task.classList.add('task')
    task.classList.add('task-item')
    task.id = taskItem.name

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('task-text')
    checkbox.classList.add('checkbox-input')
    checkbox.id = taskItem.id
    checkbox.addEventListener('change', () => {
     taskItem.completed = !taskItem.completed
    })
    
    const circle = document.createElement('label')
    circle.classList.add('checkbox-circle')
    //se pone así?
    circle.setAttribute('for', taskItem.id)
    circle.textContent = taskItem.name

    const eliminateButton = document.createElement('button')
    eliminateButton.classList.add('eliminate-task-button')
    eliminateButton.id = 'eliminate-task-button'
    eliminateButton.textContent = 'x'
    eliminateButton.addEventListener('click', ()=> {
        task.remove()
        //me chivó josefa que con splice, pero luego lo busqué en página oficial
        all.splice(all.indexOf(taskItem), 1);
        active.splice(active.indexOf(taskItem), 1);
        //el tercer valor es item, 
    })
    task.append(checkbox)
    task.append(circle)
    task.append(eliminateButton)
    taskListElement.append(task)
    })
}

const filterList = (event) => {
    listSelected = event.target.dataset.filter
    const amountFilters = filtersElement.children.length

    //se supone que aquí hay que usar el data para quitar y poner el color?
    for (let i = 0; i < amountFilters; i++){
        filtersElement.children[i].classList.remove('button-selected')
    }
    event.target.classList.add('button-selected')

    //reseteamos la lista de complete
    completed = []
    all.forEach(taskItem => {
        if (taskItem.completed){
            completed.push(taskItem)
            //aquí elimino la que se mete en complete de la lista de active.
            active.splice(active.indexOf(taskItem), 1);
        }
    })

    //todas las
    console.log(event.target.dataset.filter);
    console.log(taskListElement.children);
    
    

    
    
    //pulsando en el botón hacemos que la lista aprezca



    console.log(completed);
    console.log(active);
    console.log(all);
}

filtersElement.addEventListener('click', filterList)
formElement.addEventListener('submit', createNewTask)




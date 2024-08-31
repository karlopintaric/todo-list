import { format } from 'date-fns';
import { getToDo, updateToDo } from '../lib/todo';
import createEditableToDo from './todo-item-edit';

export default function populateToDoItem({ id, title, dueDate, description, priority, done, projectName }, toDoDiv) {
    toDoDiv.textContent = '';

    toDoDiv.className = 'todo-item';
    toDoDiv.addEventListener('click', toDoClickHandler);

    // Priority
    toDoDiv.classList.add(`priority-${priority}`);

    // Checkbox
    const toDoCheck = document.createElement('input');
    toDoCheck.type = 'checkbox';
    toDoCheck.checked = done;

    if (done) toDoDiv.classList.add('checked');

    // Title
    const toDoTitle = document.createElement('p');
    toDoTitle.classList.add('todo-title');
    toDoTitle.textContent = title;

    // Date
    const toDoDate = document.createElement('p');
    toDoDate.classList.add('todo-date');
    toDoDate.textContent = format(dueDate, 'PP');

    // Hidden div
    const additionalInfoDiv = document.createElement('div');
    additionalInfoDiv.classList.add('additional-info')

    // Description
    const toDoDesc = document.createElement('small');
    toDoDesc.classList.add('todo-desc')
    toDoDesc.textContent = `Description: ${description}`;

    // Project
    const toDoProject = document.createElement('small');
    toDoProject.classList.add('todo-project');
    toDoProject.textContent = `# ${projectName}`;

    additionalInfoDiv.appendChild(toDoDesc);
    additionalInfoDiv.appendChild(toDoProject);
    
    // Buttons
    const editButton = document.createElement('button');
    editButton.id = 'edit-todo';
    editButton.textContent = '✎'

    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-todo';
    deleteButton.textContent = '✖';

    toDoDiv.appendChild(toDoCheck);
    toDoDiv.appendChild(toDoTitle);
    toDoDiv.appendChild(toDoDate);
    toDoDiv.appendChild(editButton);
    toDoDiv.appendChild(deleteButton);
    toDoDiv.appendChild(additionalInfoDiv);

    toDoDiv.dataset.id = id;
}

function toDoClickHandler(e) {
    if (e.target.type === 'checkbox') {
        handleCheckbox(e);
    } else if (e.target.id === 'edit-todo') {
        handleToDoEdit(e);
    } else if (e.target.id === 'delete-todo') {
        handleToDoDelete(e);
    } else if(e.target.id === 'save-edit') {
        saveToDoEdit(e)
    } else if (e.target.classList.contains('todo-item')) {
        handleToDoExpand(e);
    } else {
        return;
    }

}

function handleToDoExpand(e) {
    const additionalInfoDiv = e.target.querySelector('.additional-info')
    
    e.target.classList.toggle('expanded')

    if (additionalInfoDiv.style.maxHeight) {
        additionalInfoDiv.style.maxHeight = null;
    } else {
        additionalInfoDiv.style.maxHeight = '100%';
    }

}

function handleCheckbox(e) {
    const checkedValue = e.target.checked;
    const parentToDo = e.currentTarget;
    const id = parentToDo.dataset.id;

    parentToDo.classList.toggle('checked');
    updateToDo(id, {done: checkedValue});
}

function handleToDoEdit(e) {
    const parentToDo = e.currentTarget;
    const item = getToDo(parentToDo.dataset.id);

    createEditableToDo(item, parentToDo);
}


function handleToDoDelete(e) {
    const parentToDo = e.currentTarget;
    const id = parentToDo.dataset.id;

    deleteToDo(id);
    parentToDo.remove();
}


function saveToDoEdit(e) {
    const parentToDo = e.currentTarget;
    const id = parentToDo.dataset.id;
    
    const title = parentToDo.querySelector('.todo-title').value;
    const dueDate = parentToDo.querySelector('.todo-date').value;
    const description = parentToDo.querySelector('.todo-desc').value;
    const priority = parseInt(parentToDo.querySelector('.priority-buttons .active').dataset.priority);

    const updateData = {
        title,
        description,
        dueDate,
        priority
    }

    // Update and remove edit mode
    updateToDo(id, updateData);

    // Get new data
    const updatedToDoItem = getToDo(id);
    populateToDoItem(updatedToDoItem, parentToDo);

}
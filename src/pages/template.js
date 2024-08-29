import { createToDo, deleteToDo, getToDo, updateToDo } from "../lib/todo";
import { format, formatISO } from 'date-fns';

const PRIORITY_CLASSES = ['red', 'yellow', 'green'];

export function createSkeleton(title) {

    // Create title element
    const titleHeading = document.createElement('h3');
    titleHeading.classList.add('page-title');
    titleHeading.textContent = title;

    return titleHeading
}

function toDoClickHandler(e) {
    if (e.target.type === 'checkbox') {
        handleCheckbox(e);
    } else if (e.target.id === 'edit-todo') {
        handleToDoEdit(e);
    } else if (e.target.id === 'delete-todo') {
        handleToDoDelete(e);
    } else if (e.target.classList.contains('todo-item')) {
        handleToDoExpand(e);
    } else {
        return;
    }

}

function handleToDoExpand(e) {
    const descPara = e.target.querySelector('small.todo-desc');

    if (!descPara) return;
    
    e.target.classList.toggle('expanded')

    if (descPara.style.maxHeight) {
        descPara.style.maxHeight = null;
    } else {
        descPara.style.maxHeight = descPara.scrollHeight + 'px';
    }

}

function handleCheckbox(e) {
    const checkedValue = e.target.checked;
    const parentToDo = e.currentTarget;
    const id = parentToDo.dataset.id;

    parentToDo.classList.toggle('checked');
    updateToDo(id, {done: checkedValue});
}

function handleChangePriority(e) {
    const priorityButtons = document.querySelector('.priority-buttons').children;

    for (let btn of priorityButtons) {
        btn.classList.remove('active');
    }

    e.target.classList.add('active');

}

function handleToDoEdit(e) {
    const parentToDo = e.currentTarget;
    const item = getToDo(parentToDo.dataset.id);
    parentToDo.textContent = '';

    if (!parentToDo.classList.contains('expanded')) {
        parentToDo.classList.add('expanded');
    }

    // Remove priority border
    parentToDo.className = parentToDo.className.replace(/priority-[\d]/, '');
    
    // Title
    const toDoTitle = document.createElement('input');
    toDoTitle.type = 'text';
    toDoTitle.classList.add('todo-title');
    toDoTitle.value = item.title;

    // Date
    const toDoDate = document.createElement('input');
    toDoDate.type = 'date';
    toDoDate.format = 'yyyy-MM-dd'
    toDoDate.classList.add('todo-date');
    toDoDate.value = format(item.dueDate, 'yyyy-MM-dd');

    // Description
    const toDoDesc = document.createElement('input');
    toDoDesc.type = 'text';
    toDoDesc.classList.add('todo-desc');
    toDoDesc.value = item.description;
    toDoDesc.style.maxHeight = '100%';

    // Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.id = 'save-edit'
    saveButton.addEventListener('click', saveToDoEdit);

    // Edit priority button
    const priorityButtons = document.createElement('div');
    priorityButtons.classList.add('priority-buttons');
    for (let i = 0; i < 3; i++) {
        const priorityValue = i + 1;

        const editPriorityButton = document.createElement('button');
        editPriorityButton.dataset.priority = priorityValue;
        editPriorityButton.textContent = priorityValue;

        editPriorityButton.classList.add(PRIORITY_CLASSES[i])
        if (item.priority === priorityValue) {
            editPriorityButton.classList.add('active');
        }

        editPriorityButton.addEventListener('click', handleChangePriority);
        priorityButtons.appendChild(editPriorityButton);
    }

    
    parentToDo.appendChild(toDoTitle);
    parentToDo.appendChild(toDoDate);
    parentToDo.appendChild(priorityButtons);
    parentToDo.appendChild(toDoDesc);
    parentToDo.appendChild(saveButton);
}

function saveToDoEdit(e) {
    const parentToDo = e.target.parentElement;
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
    parentToDo.textContent = '';

    // Get new data
    const updatedToDoItem = getToDo(id);
    populateToDoItem(updatedToDoItem, parentToDo);

}

function handleToDoDelete(e) {
    const parentToDo = e.currentTarget;
    const id = parentToDo.dataset.id;

    deleteToDo(id);
    parentToDo.remove();
}

function populateToDoItem(item, toDoDiv) {
    toDoDiv.className = 'todo-item';

    // Priority
    toDoDiv.classList.add(`priority-${item.priority}`);

    // Checkbox
    const toDoCheck = document.createElement('input');
    toDoCheck.type = 'checkbox';
    toDoCheck.checked = item.done;

    if (item.done) toDoDiv.classList.add('checked');

    // Title
    const toDoTitle = document.createElement('p');
    toDoTitle.classList.add('todo-title');
    toDoTitle.textContent = item.title;

    // Date
    const toDoDate = document.createElement('p');
    toDoDate.classList.add('todo-date');
    toDoDate.textContent = format(item.dueDate, 'PP');

    // Description
    const toDoDesc = document.createElement('small');
    toDoDesc.classList.add('todo-desc')
    toDoDesc.textContent = `Description: ${item.description}`;

    
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
    toDoDiv.appendChild(toDoDesc);

    toDoDiv.dataset.id = item.id;
}


export function renderToDos(fetchFunc, pageContent) {

    function render() {
        const todos = fetchFunc()

        // Create ToDos container
        const toDosContainer = document.createElement('div');
        toDosContainer.classList.add('todos');

        todos.forEach(item => {
            // Div
            const toDoDiv = document.createElement('div');
            toDoDiv.addEventListener('click', toDoClickHandler);

            populateToDoItem(item, toDoDiv);
            toDosContainer.appendChild(toDoDiv)
        });

        pageContent.appendChild(toDosContainer);
    };

    return render
}
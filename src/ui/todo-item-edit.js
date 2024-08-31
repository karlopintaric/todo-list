import { format } from 'date-fns';

const PRIORITY_CLASSES = ['red', 'yellow', 'green'];

export default function createEditableToDo({ title, dueDate, description, priority, projectName }, toDoDiv) {
    toDoDiv.textContent = '';

    if (!toDoDiv.classList.contains('expanded')) {
        toDoDiv.classList.add('expanded');
    }

    // Remove priority border
    toDoDiv.className = toDoDiv.className.replace(/priority-[\d]/, '');
    
    // Title
    const toDoTitle = document.createElement('input');
    toDoTitle.type = 'text';
    toDoTitle.classList.add('todo-title');
    toDoTitle.value = title;

    // Date
    const toDoDate = document.createElement('input');
    toDoDate.type = 'date';
    toDoDate.format = 'yyyy-MM-dd'
    toDoDate.classList.add('todo-date');
    toDoDate.value = format(dueDate, 'yyyy-MM-dd');

    // Hidden div
    const additionalInfoDiv = document.createElement('div');
    additionalInfoDiv.classList.add('additional-info');
    additionalInfoDiv.style.maxHeight = '100%';

    // Description
    const toDoDesc = document.createElement('input');
    toDoDesc.type = 'text';
    toDoDesc.classList.add('todo-desc');
    toDoDesc.value = description;

    additionalInfoDiv.appendChild(toDoDesc);

    // Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.id = 'save-edit'

    // Edit priority button
    const priorityButtons = document.createElement('div');
    priorityButtons.classList.add('priority-buttons');
    for (let i = 0; i < 3; i++) {
        const priorityValue = i + 1;

        const editPriorityButton = document.createElement('button');
        editPriorityButton.dataset.priority = priorityValue;
        editPriorityButton.textContent = priorityValue;

        editPriorityButton.classList.add(PRIORITY_CLASSES[i])
        if (priority === priorityValue) {
            editPriorityButton.classList.add('active');
        }

        editPriorityButton.addEventListener('click', handleChangePriority);
        priorityButtons.appendChild(editPriorityButton);
    }

    
    toDoDiv.appendChild(toDoTitle); 
    toDoDiv.appendChild(toDoDate);
    toDoDiv.appendChild(priorityButtons);
    toDoDiv.appendChild(additionalInfoDiv);
    toDoDiv.appendChild(saveButton);
}

function handleChangePriority(e) {
    const priorityButtons = document.querySelector('.priority-buttons').children;

    for (let btn of priorityButtons) {
        btn.classList.remove('active');
    }

    e.target.classList.add('active');
}
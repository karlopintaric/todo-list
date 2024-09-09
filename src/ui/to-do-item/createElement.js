import { format } from 'date-fns';

export default function createElement({ id, title, dueDate, description, priority, done, projectName }, toDoDiv) {
    toDoDiv.textContent = '';
    
    toDoDiv.className = 'todo-item';
    toDoDiv.classList.add(`priority-${priority}`);
    toDoDiv.dataset.id = id;

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

    // Additional info div (description and project)
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
}
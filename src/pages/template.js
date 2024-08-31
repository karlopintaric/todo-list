import populateToDoItem from '../ui/todo-item-view';

const pageContent = document.querySelector('.content');

function createSkeleton(title) {

    // Create title element
    const titleHeading = document.createElement('h3');
    titleHeading.classList.add('page-title');
    titleHeading.textContent = title;

    pageContent.appendChild(titleHeading);
}

export function renderPage(title, fetchFunc) {
    pageContent.textContent = '';
    createSkeleton(title);

    const todos = fetchFunc();

    // Create ToDos container
    const toDosContainer = document.createElement('div');
    toDosContainer.classList.add('todos');

    todos.forEach(item => {
        // Div
        const toDoDiv = document.createElement('div');

        populateToDoItem(item, toDoDiv);
        toDosContainer.appendChild(toDoDiv)
    });

    pageContent.appendChild(toDosContainer);
};
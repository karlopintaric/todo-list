import { deleteToDo, updateToDo } from "../../lib/todo";

export default function createEventListeners(toDoDiv, { handleToDoEdit }) {
    toDoDiv.addEventListener('click', (e) => {
        if (e.target.type === 'checkbox') {
            handleCheckbox(e, toDoDiv);
        } else if (e.target.id === 'edit-todo') {
            handleToDoEdit();
        } else if (e.target.id === 'delete-todo') {
            handleToDoDelete(toDoDiv);
        } else if (e.target.classList.contains('todo-item')) {
            handleToDoExpand(toDoDiv);
        } else {
            return;
        }
    });
}

function handleToDoExpand(toDoDiv) {
    const additionalInfoDiv = toDoDiv.querySelector('.additional-info')
    
    toDoDiv.classList.toggle('expanded')

    if (additionalInfoDiv.style.maxHeight) {
        additionalInfoDiv.style.maxHeight = null;
    } else {
        additionalInfoDiv.style.maxHeight = '100%';
    }

}

function handleCheckbox(e, toDoDiv) {
    const checkedValue = e.target.checked;
    const id = toDoDiv.dataset.id;

    toDoDiv.classList.toggle('checked');

    updateToDo(id, {done: checkedValue});
}

function handleToDoDelete(toDoDiv) {
    const id = toDoDiv.dataset.id;

    deleteToDo(id);
    toDoDiv.remove();
}

import createElement from "./createElement";

export default function ToDoList(fetchFunc) {
    const _toDosList = document.createElement('div');
    let items;

    const _init = () => {
        _toDosList.classList.add('todos');

        refresh();
    };

    const getElement = () => _toDosList;

    const refresh = () => {
        items = fetchFunc();
        createElement(items, _toDosList);
    }

    _init();

    return {
        getElement,
        refresh
    }
}
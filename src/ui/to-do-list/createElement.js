import ToDoItem from "../to-do-item/toDoItem";

export default function createElement(items, _toDosList) {
    _toDosList.textContent = '';

    items.forEach((data) => {
        let item = ToDoItem(data);
        _toDosList.appendChild(item.getElement());
    });
}
import { getToDo, updateToDo } from '../../lib/todo';
import createElement from './createElement';
import enterEditMode from './enterEditMode';
import createEventListeners from './handleEvents';

export default function ToDoItem(data) {
    const _toDoDiv = document.createElement('div');
    const id = data.id;

    const _init = () => {
        createElement(data, _toDoDiv);
        _addEventListeners();
    }

    const getElement = () => _toDoDiv;

    const _addEventListeners = () => {
        createEventListeners(_toDoDiv, {
            handleToDoEdit: () => {
                enterEditMode(data, _toDoDiv, _saveToDoEdit)
            }
        });
    }

    const _saveToDoEdit = (updatedData) => {
        updateToDo(id, updatedData)
        _refresh();
    }


    const _refresh = () => {
        const updatedData = getToDo(id);

        createElement(updatedData, _toDoDiv);
    }

    _init();

    return {
        getElement
    }
}
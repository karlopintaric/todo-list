import { endOfToday } from "date-fns/endOfToday";
import StorageRouter from "./storage";
import { differenceInDays, differenceInWeeks, isThisWeek, isToday } from 'date-fns';

const storageRouter = StorageRouter();

function sortByDate(toDosArr) {
    const sortedArr = toDosArr.toSorted((a, b) => {
        if (a.done) {
            return 1;
        }

        return differenceInDays(a.dueDate, b.dueDate);
    })

    return sortedArr;
}

export function createToDo(data) {
    storageRouter.newItem(data, 'todo');
}

export function updateToDo(id, data) {
    storageRouter.updateItem(id, data, 'todo');
}

export function getDueToday() {
    const toDos = getAllToDos();

    const dueToday = toDos.filter(item => isToday(item.dueDate));

    return sortByDate(dueToday);

}

export function getDueThisWeek() {
    const toDos = getAllToDos();

    const dueThisWeek = toDos.filter(item => isThisWeek(item.dueDate));

    return sortByDate(dueThisWeek);
}

export function getAllToDos() {
    const toDos = storageRouter.getAllItems('todo');

    return sortByDate(toDos);
}

export function deleteToDo(id) {
    storageRouter.removeItem(id, 'todo');
}

export function getToDo(id) {
    return storageRouter.getItem(id, 'todo');
}
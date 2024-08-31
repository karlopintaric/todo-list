import { getAllProjects, getProjectById } from "./project";
import StorageRouter from "./storage";
import { differenceInDays, isThisWeek, isToday } from 'date-fns';

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

function getProjectNames(toDosArr) {
    return toDosArr.map((todo) => (
        {...todo,
        projectName: getProjectById(todo.projectId).name,
        }))
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

    return dueToday;

}

export function getDueThisWeek() {
    const toDos = getAllToDos();

    const dueThisWeek = toDos.filter(item => isThisWeek(item.dueDate));

    return dueThisWeek;
}

export function getAllToDos() {
    const toDos = getProjectNames(storageRouter.getAllItems('todo'));

    return sortByDate(toDos);
}

export function deleteToDo(id) {
    storageRouter.removeItem(id, 'todo');
}

export function getToDo(id) {
    const todo = storageRouter.getItem(id, 'todo');

    return {...todo,
            projectName: getProjectById(todo.projectId).name
        }
}

export function getToDosInProject(projectId) {
    const toDos = getProjectNames(storageRouter.getItemsIf('projectId', projectId, 'todo'));

    return sortByDate(toDos);
}
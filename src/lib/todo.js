import StorageRouter from "./storage";

export default function ToDo() {
    const storageRouter = StorageRouter();

    const createToDo = (data) => {
        storageRouter.newItem(data, 'todo');
    }

    const getAllToDos = () => storageRouter.getAllItems('todo');

    return {
        createToDo,
        getAllToDos
    }
}
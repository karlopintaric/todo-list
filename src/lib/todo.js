import storage from "./storage";

class ToDo {
    #storage

    constructor(storage) {
        this.#storage = storage;
    }

    newToDo(data) {
        this.#storage.save(data);
    }

    getToDo (id) {
        return JSON.parse(this.#storage.read(id));
    }

    changeToDo(id, updateData) {
        this.#storage.update(id, JSON.stringify(updateData));
    }

}

export default toDoApp;
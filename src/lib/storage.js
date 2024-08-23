import { ToDoModel } from "./model";

class Storage {

    constructor() {
        if (this.constructor === Storage) {
            throw new Error('Abstract classes can\'t be instantiated.')
        }
    }

    update() {
        throw new Error('Method \'update\' must be implemented');
    }

    save() {
        throw new Error('Method \'save\' must be implemented');
    }

    remove() {
        throw new Error('Method \'remove\' must be implemented');
    }

    read() {
        throw new Error('Method \'update\' must be implemented');
    }

}

class LocalUserStorage extends Storage {
    #model

    constructor(model) {
        super()
        this.#model = model;
    }

    save(data) {
        const newId = this.#getNewId();
        const obj = new this.#model(data);

        localStorage.setItem(newId, obj);
    }

    read(id) {
        return localStorage.getItem(id);
    }

    update(id, updateData) {
        const changedObj = this.read(id);
        for (let prop in updateData) {
            changedObj[prop] = updateData[prop];
        }

        localStorage.setItem(id, changedObj);
    }

    remove(id) {
        localStorage.removeItem(id);
    }

    getAllItems() {
        return localStorage;
    }

    #getNewId() {
        let maxId = 0;

        for (let id in localStorage) {
            id = parseInt(id);
            if (id > maxId) maxId = id;
        }

        return maxId
    }

}

export default LocalUserStorage;
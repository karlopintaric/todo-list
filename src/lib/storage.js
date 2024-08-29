import { ToDoModel, ProjectModel } from "./models";

function LocalStorage(storageName, model) {

    const create = (data) => {
        const items = getItems();

        const newId = _getNewId(items);
        data.id = newId;

        _setItem(data, items);
    }

    const read = (id) => getIf('id', id)[0];

    const update = (id, updateData) => {
        const changedObj = read(id);

        for (let prop in updateData) {
            changedObj[prop] = updateData[prop];
        }

        remove(id);
        _setItem(changedObj, getItems());
    }

    const remove = (id) => removeIf('id', id);

    const getItems = () => {
        let items = JSON.parse(localStorage.getItem(storageName))
        
        if (!items) {
            items = [];
        }

        return items;
    };

    const getIf = (prop, value) => {

        return getItems().filter(obj => obj[prop] == value);
    }

    const removeIf = (prop, value) => {
        const items = getItems().filter(obj => obj[prop] != value);

        _updateStorage(items);
    }

    const _setItem = (data, items) => {
        const newObj = model.newEntity(data);

        items.push(newObj);
        _updateStorage(items);
    }

    const _getNewId = (items) => {
        if (items.length === 0) {
            return 0;
        }

        const allIds = items.map(obj => obj.id)

        return Math.max(...allIds) + 1;
    } 

    const _updateStorage = (items) => localStorage.setItem(storageName, JSON.stringify(items));

    return { 
        create,
        read,
        update,
        remove,
        getIf,
        removeIf,
        getItems
    }
    
}

export default function StorageRouter() {

    const storageMap = {
        'todo': LocalStorage('todo', ToDoModel()),
        'project': LocalStorage('project', ProjectModel())
    }

    const newItem = (data, storageName) => {
        storageMap[storageName].create(data);
    }

    const updateItem = (id, data, storageName) => {
        storageMap[storageName].update(id, data);
    }

    const removeItem = (id, storageName) => {
        storageMap[storageName].remove(id);
    }

    const getItem = (id, storageName) => {
        return storageMap[storageName].read(id);
    }

    const getItemsIf = (prop, value, storageName) => {
        return storageMap[storageName].getIf(prop, value)
    }

    const removeItemsIf = (prop, value, storageName) => {
        storageMap[storageName].removeIf(prop, value);
    }
 
    const getAllItems = (storageName) => {
        return storageMap[storageName].getItems();
    }

    return {
        newItem, 
        updateItem,
        removeItem,
        getItem,
        getItemsIf,
        removeItemsIf,
        getAllItems
    }

};
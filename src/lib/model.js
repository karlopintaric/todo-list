class ToDoModel {
    #id
    #title;
    #description;
    #dueDate;
    #priority;

    validPriorities = [1, 2, 3];
    
    constructor({ id, title, description, dueDate, priority }) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        this.#title = newTitle.trim();
    }

    get description() {
        return this.#description
    }

    set description(newDescription) {
        this.#description = newDescription.trim();
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(newDuedate) {
        newDuedate =  new Date(newDuedate);

        if (!newDuedate) {
            newDuedate = null;
        }

        this.#dueDate = newDuedate;
    }

    get priority() {
        return this.#priority;
    }

    set priority(newPriority) {
        if (!this.validPriorities.includes(newPriority)) {
            newPriority = null;
        }

        this.#priority = newPriority
    }

}

export default ToDoModel;
function validateIds(id) {
    if (isNaN(id) || !Number.isInteger(id)) {
        id = null;
    }

    return id;
}

function ToDoModel() {
    const validPriorities = [1, 2, 3];

    const newEntity = (data) => {
        return {
            id: validateIds(data.id),
            title: _validateTitle(data.title),
            description: _validateDescription(data.description),
            duedate: _validateDueDate(data.dueDate),
            priority: _validatePriority(data.priority),
            done: _validateCompleted(data.done),
            project_id: validateIds(data.project_id)
        }
    }

    const _validateTitle = (title) => title.trim();

    const _validateDescription = (description) => description.trim();

    const _validateDueDate = (dueDate) => {
        const today = new Date();
        let duedate =  new Date(dueDate);

        if (isNaN(duedate) || today > duedate) {
            duedate = null;
        }

        return duedate;
    }

    const _validateCompleted = (done) => {
        if (!(typeof done === 'boolean')) {
            done = false;
        }

        return done;
    }

    const _validatePriority = (priority) => {
        if (!validPriorities.includes(priority)) {
            priority = null;
        }

        return priority;
    }

    return {
        newEntity
    }

};

function ProjectModel() {
    
    const newEntity = (data) => {
        return {
            id: validateIds(data.id),
            name: _validateProjectName(data.name),
        }
    }

    const _validateProjectName = (name) => name.trim();

    return {
        newEntity
    }
}

export { ToDoModel, ProjectModel };
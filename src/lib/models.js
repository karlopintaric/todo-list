import { endOfDay } from "date-fns";

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
            dueDate: _validateDueDate(data.dueDate),
            priority: _validatePriority(data.priority),
            done: _validateCompleted(data.done),
            projectId: _validateProject(data.projectId)
        }
    }

    const _validateTitle = (title) => title.trim();

    const _validateDescription = (description) => description.trim();

    const _validateDueDate = (dueDate) => {
        const today = new Date();
        let duedate =  endOfDay(new Date(dueDate));

        if (isNaN(duedate) || today > (duedate + 1)) {
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


    const _validateProject = (projectId) => {
        if (!projectId) {
            projectId = 0;
        }

        return projectId;
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
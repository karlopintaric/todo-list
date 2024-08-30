import StorageRouter from './storage';

const storageRouter = StorageRouter();

function _init() {
    const projectList = getAllProjects();

    if (projectList.length === 0) {
        createProject('Default');
    }
}

_init();

export function createProject(name) {
    const data = {name};
    storageRouter.newItem(data, 'project');
}

export function getAllProjects() {
    const projectList = storageRouter.getAllItems('project');

    return projectList;
}

export function getProjectById(id) {
    const project = storageRouter.getItem(id, 'project');

    return project;
}

export function removeProject(id) {
    storageRouter.removeItem(id, 'project');
}
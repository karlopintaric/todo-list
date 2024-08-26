import StorageRouter from './storage';

export default function Project() {
    const storageRouter = StorageRouter();

    const createProject = (name) => {
        data = {name};
        storageRouter.newItem(data, 'project');
    }

    const _init = () => {
        const projectList = storageRouter.getAllItems('project');

        if (projectList.length === 0) {
            createProject('Default');
        }
    }

    _init();
}

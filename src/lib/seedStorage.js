import data from './data.json';
import { createProject } from './project';
import { createToDo, updateToDo } from './todo';

export default function seedStorage() {
    if (localStorage.length === 0) {

        const projects = data['projects'];
        const toDos = data['todos'];

        for (let project of projects) {
            createProject(project.name);
        }

        for (let toDo of toDos) {
            toDo.dueDate = new Date();
            createToDo(toDo);
        }
    }
}
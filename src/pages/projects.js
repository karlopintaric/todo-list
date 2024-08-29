import { createSkeleton } from "./template";
import { getProjectById } from "../lib/project";

export default function (id, pageContent) {
    const project = getProjectById(id);

    const skeleton = createSkeleton(project.name);
    //const render = renderToDos(getAllToDos, pageContent);

    const init = () => {
        pageContent.appendChild(skeleton);
        //render();
    }

    init();

    //const toDoContainer = document.querySelector('.todos');
    //createToDo({title: 'Due Today', description: 'Testdsdsadadsaas', dueDate: '2024-08-27'})

}
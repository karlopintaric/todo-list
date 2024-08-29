import { createSkeleton, renderToDos } from "./template";
import { getDueToday } from "../lib/todo";

export default function (pageContent) {
    const skeleton = createSkeleton('Due Today');
    const render = renderToDos(getDueToday, pageContent);

    const init = () => {
        pageContent.appendChild(skeleton);
        render();
    }

    init();

    const toDoContainer = document.querySelector('.todos');
    //createToDo({title: 'Due Today', description: 'Testdsadsadsa', dueDate: '2024-08-27'})

}
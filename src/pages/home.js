import { createSkeleton, renderToDos } from "./template";
import { getAllToDos, createToDo, getDueToday } from "../lib/todo";

export default function (pageContent) {
    const skeleton = createSkeleton('Home');
    const render = renderToDos(getAllToDos, pageContent);

    const init = () => {
        pageContent.appendChild(skeleton);
        render();
    }

    init();

    const toDoContainer = document.querySelector('.todos');
    //createToDo({title: 'Due Tomorrow', description: 'Testdsdsaas', dueDate: '2024-08-29'})

}
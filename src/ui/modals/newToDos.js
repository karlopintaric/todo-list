import { getAllProjects } from "../../lib/project";
import { createToDo } from "../../lib/todo";
import Modal from "./modal";

export default function ToDosModal(sidebar) {
    const modal = Modal(
        '#todo-modal',
        () => _populateProjects(),
        () => sidebar.refreshAll(),
    )

    let modalDialog;
    let projectSelect;

    const _init = () => {
        modalDialog = modal.getElement();

        const closeButton = modalDialog.querySelector('.modal-header button');
        closeButton.addEventListener('click', modal.close)

        const addButton = modalDialog.querySelector('.modal-footer button');
        addButton.addEventListener('click', _addToDo);

        projectSelect = modalDialog.querySelector('select');
    }
    

    const _populateProjects = () => {
        projectSelect.textContent = '';
        const projects = getAllProjects();

        for (let project of projects) {
            let opt = document.createElement('option');
            opt.value = project.id;
            opt.textContent = project.name;

            projectSelect.appendChild(opt);
        }

        projectSelect.value = 0;

    };
    
    const _addToDo = (e) => {

        const title = modalDialog.querySelector('.todo-title').value;
        const description = modalDialog.querySelector('.todo-desc').value;
        const dueDate = modalDialog.querySelector('.todo-date').value;
        const priority = parseInt(modalDialog.querySelector('input[type="radio"]:checked').value);
        const projectId = parseInt(projectSelect.value);

        const data = {
            title,
            description,
            dueDate,
            priority,
            projectId
        }

        for (let prop in data) {
            if (data[prop] === '') return;
        }
        
        createToDo(data);

        modalDialog.querySelector('form').reset();
        e.preventDefault();
        modal.close();
    }

    _init();

    return {
        open: modal.open,
    }

}
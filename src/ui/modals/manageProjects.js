import { getAllProjects, createProject, removeProject } from "../../lib/project";
import Modal from "./modal";

export default function ProjectsModal(sidebar, page) {
    const modal = Modal(
        '#projects-modal',
        () => _populateModal(),
        () => {
            sidebar.refresh(),
            page.refresh()
        }
    )

    let modalDialog;
    let contentSection;

    const _init = () => {
        modalDialog = modal.getElement();
        contentSection = modalDialog.querySelector('.modal-main');

        const closeButton = modalDialog.querySelector('.modal-header button');
        closeButton.addEventListener('click', modal.close)

        const addButton = modalDialog.querySelector('.modal-footer button');
        addButton.addEventListener('click', _addProject);
    }
    

    const _populateModal = () => {
        contentSection.textContent = '';
        const projects = getAllProjects();
    
        projects.forEach((project) => {
            const projectDiv = document.createElement('div');
            projectDiv.dataset.id = project.id;
            
            const projectNamePara = document.createElement('p');
            projectNamePara.textContent = `# ${project.name}`;
    
            const removeProjectButton = document.createElement('button');
            removeProjectButton.textContent = '🗙';
            removeProjectButton.classList.add('center');
            removeProjectButton.addEventListener('click', _removeProjectItem);
    
            projectDiv.appendChild(removeProjectButton);
            projectDiv.appendChild(projectNamePara);
    
            contentSection.appendChild(projectDiv);
        });
    }
    
    const _addProject = (e) => {
        e.preventDefault();

        const projectNameInput = modalDialog.querySelector('.modal-footer input');
        const projectNameValue = projectNameInput.value;
    
        if (!projectNameValue) return;
    
        createProject(projectNameValue);
        projectNameInput.value = '';

        _populateModal();
    }
    
    const _removeProjectItem = (e) => {
        const projectItem = e.target.parentElement;
        const projectId = projectItem.dataset.id;

        if (projectId == 0) return;
    
        removeProject(projectId);

        _populateModal();
    }

    _init();

    return {
        open: modal.open,
    }

}
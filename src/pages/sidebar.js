import { getAllProjects, createProject, removeProject } from "../lib/project";
import projects from "./projects";

const projectsModal = document.querySelector('#projects-modal');
const projectsList = document.querySelector('ul.projects');
const contentSection = projectsModal.querySelector('.modal-main');

// Close event listener not working as expected
const dialog = document.querySelector('dialog');
projectsModal.addEventListener('keydown', (e) => {
    const key = e.key
    if (key === 'Escape') {
        e.preventDefault();
    }
})

export function populateProjectsList() {
    projectsList.textContent = '';
    const projects = getAllProjects();

    for (let project of projects) {
        const listItem = document.createElement('li');
        const projectNavButton = document.createElement('button');

        projectNavButton.classList.add('nav-button');
        projectNavButton.classList.add('project-nav');
        projectNavButton.textContent = `#  ${project.name}`;
        projectNavButton.dataset.id = project.id;

        listItem.appendChild(projectNavButton);
        projectsList.appendChild(listItem);
    }
}

function populateProjectsModal() {
    contentSection.textContent = '';
    const projects = getAllProjects();

    for (let project of projects) {
        const projectDiv = document.createElement('div');
        const removeProjectButton = document.createElement('button');
        const projectNamePara = document.createElement('p');

        projectNamePara.textContent = `# ${project.name}`;
        projectDiv.dataset.id = project.id;

        removeProjectButton.textContent = '🗙';
        removeProjectButton.classList.add('center');
        removeProjectButton.addEventListener('click', removeProjectItem);

        projectDiv.appendChild(removeProjectButton);
        projectDiv.appendChild(projectNamePara);

        contentSection.appendChild(projectDiv);
    }
}

function addProject() {
    const projectNameInput = projectsModal.querySelector('.modal-footer input');
    const projectNameValue = projectNameInput.value;

    if (!projectNameValue) return;

    createProject(projectNameValue);
    projectNameInput.value = '';
}

function removeProjectItem(e) {
    const projectItem = e.target.parentElement;
    const projectId = projectItem.dataset.id;

    removeProject(projectId);
    populateProjectsModal();
}

export function manageProjectsClickHandler() {
    const closeButton = projectsModal.querySelector('.modal-header button');
    const addButton = projectsModal.querySelector('.modal-footer  button');


    closeButton.addEventListener('click', () => {
        projectsModal.close()
        populateProjectsList()});

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        addProject()
        populateProjectsModal(contentSection);
    })

    projectsModal.showModal();
    populateProjectsModal(contentSection);
}
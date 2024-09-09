const projectsList = document.querySelector('ul.projects');
import { createProject, getAllProjects } from "../../lib/project";

export default function createProjectsList() {
    projectsList.textContent = '';

    const projects = getAllProjects();

    projects.forEach((project) => {
        const listItem = document.createElement('li');

        const projectNavButton = document.createElement('button');
        projectNavButton.classList.add('nav-button');
        projectNavButton.classList.add('project-nav');
        projectNavButton.textContent = `#  ${project.name}`;
        projectNavButton.dataset.id = project.id;

        listItem.appendChild(projectNavButton);
        projectsList.appendChild(listItem);
    });
}
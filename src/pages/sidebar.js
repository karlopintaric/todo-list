import { getAllProjects, createProject } from "../lib/project";

export function populateProjectsList(listElement) {
    const projects = getAllProjects();

    for (let project of projects) {
        const listItem = document.createElement('li');
        const projectNavButton = document.createElement('button');

        projectNavButton.classList.add('nav-button');
        projectNavButton.classList.add('project-nav');
        projectNavButton.textContent = `#  ${project.name}`;
        projectNavButton.dataset.id = project.id;

        listItem.appendChild(projectNavButton);
        listElement.appendChild(listItem);
    }
}


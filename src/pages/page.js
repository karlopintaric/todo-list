import ToDoList from '../ui/to-do-list/toDoList'
import pageMap from './pageMap';
import loadProject from './projects';

const pageContent = document.querySelector('.content');

function createSkeleton(title) {

    // Create title element
    const titleHeading = document.createElement('h3');
    titleHeading.classList.add('page-title');
    titleHeading.textContent = title;

    pageContent.appendChild(titleHeading);
}

export default function Page() {
    let toDoList;

    const _render = ({ title, fetchFunc }) => {
        pageContent.textContent = '';
        createSkeleton(title);
    
        toDoList = ToDoList(fetchFunc);
    
        pageContent.appendChild(toDoList.getElement());
    }

    const renderPage = (pageId) => {
        const pageData = pageMap[pageId];
        if (!pageData) return;

        _render(pageData);
    }
    
    const renderProject = (id) => {
        const projectData = loadProject(id);

        _render(projectData);
    }

    const refresh = () => {
        if (!toDoList) return;

        toDoList.refresh();
    }

    return {
        renderPage,
        renderProject,
        refresh
    }

};
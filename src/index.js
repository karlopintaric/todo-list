import './styles.css';
import homePage from './pages/home';
import todayPage from './pages/today';
import weekPage from './pages/week';

import { populateProjectsList, manageProjectsClickHandler } from './pages/sidebar';
import loadProject from './pages/projects';

(function RenderDOM() {
    // Cache buttons
    const sidebar = document.querySelector('.sidebar');
    const openProjectsModalButton = document.querySelector('.projects-section > button');
    const newToDoModalButton = document.querySelector('#new-todo');

    const pageMap = {
        'home': homePage,
        'today': todayPage,
        'week': weekPage,
    };

    const initPage = () => {
        sidebar.addEventListener('click', handlePageNav);
        openProjectsModalButton.addEventListener('click', manageProjectsClickHandler);
        //newToDoModalButton.addEventListener('click', newToDoClickHandler);

        document.querySelector('#home').click();
        populateProjectsList();
    }

    const handlePageNav = (e) => {
        const clickTarget = e.target;

        // Do nothing if a tab button is not clicked
        if (!clickTarget.classList.contains('nav-button')) return;

        // Do nothing if button already active
        if (clickTarget.classList.contains('active')) return;

        // Make clicked button active
        inactivateAllButtons();
        clickTarget.classList.add('active');
        
        if (clickTarget.classList.contains('project-nav')) {
            getRequestedProject(clickTarget.dataset.id);
        } else {
            getRequestedPage(clickTarget.id);
        }
    }

    const inactivateAllButtons = () => {
        const sidebarButtons = document.querySelectorAll('.nav-button');

        for (let i = 0; i < sidebarButtons.length; i++) {
            sidebarButtons[i].classList.remove('active');
        }
    }

    const getRequestedPage = (pageId) => {
        const loadPage =  pageMap[pageId];
        loadPage ? loadPage() : null;
    }

    const getRequestedProject = (projectId) => {
        loadProject(projectId);
    }

    initPage();

})();
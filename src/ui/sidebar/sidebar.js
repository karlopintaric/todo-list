import createProjectsList from "./projectSection";
import handlePageNav from "./pageSection";

export default function Sidebar(page) {
    const sidebarElement = document.querySelector('.sidebar');

    const _init = () => {
        sidebarElement.addEventListener('click', (e) => {
            handlePageNav(e, page);
        })

        createProjectsList();
    }

    const _refresh = () => createProjectsList();

    const refreshAll = () => {
        _refresh();
        page.refresh();
    }

    const getElement = () => sidebarElement;
    
    _init();

    return {
        getElement,
        refreshAll
    }
}
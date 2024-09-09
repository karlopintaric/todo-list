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

    const refresh = () => createProjectsList();

    const getElement = () => sidebarElement;
    
    _init();

    return {
        getElement,
        refresh
    }
}
export default function handlePageNav(e, page) {
    const clickTarget = e.target;

    // Do nothing if a tab button is not clicked
    if (!clickTarget.classList.contains('nav-button')) return;

    // Do nothing if button already active
    if (clickTarget.classList.contains('active')) return;

    // Make clicked button active
    inactivateAllButtons();
    clickTarget.classList.add('active');
    
    if (clickTarget.classList.contains('project-nav')) {
        page.renderProject(clickTarget.dataset.id);
    } else {
        page.renderPage(clickTarget.id);
    }
}

function inactivateAllButtons() {
    const sidebarButtons = document.querySelectorAll('.nav-button');

    for (let i = 0; i < sidebarButtons.length; i++) {
        sidebarButtons[i].classList.remove('active');
    }
}

import './styles.css';

import seedStorage from './lib/seedStorage';
import Sidebar from './ui/sidebar/sidebar';
import Page from './pages/page';
import ProjectsModal from './ui/modals/manageProjects';
import ToDosModal from './ui/modals/newToDos';

seedStorage();

const newToDoButton = document.querySelector('#new-todo');
const manageProjectsButton = document.querySelector('.projects-section > button');

const page = Page();
const sidebar = Sidebar(page);
const projectsModal = ProjectsModal(sidebar);
const toDosModal = ToDosModal(sidebar);
document.querySelector('#home').click();

manageProjectsButton.addEventListener('click', () => projectsModal.open());
newToDoButton.addEventListener('click', () => toDosModal.open());
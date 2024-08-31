import { renderPage } from "./template";
import { getProjectById } from "../lib/project";
import { getToDosInProject } from "../lib/todo";

export default function (id) {
    const project = getProjectById(id);
    
    renderPage(
        project.name,
        () => getToDosInProject(project.id),
    )
}
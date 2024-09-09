import { getProjectById } from "../lib/project";
import { getToDosInProject } from "../lib/todo";

export default function loadProject(id) {
    const project = getProjectById(id);
    
    return {
        title: project.name,
        fetchFunc: () => getToDosInProject(project.id),
    }
}
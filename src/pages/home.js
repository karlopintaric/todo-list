import { renderPage } from "./template";
import { getAllToDos } from "../lib/todo";

export default function () {
    renderPage(
        'Home',
        () => getAllToDos(),
    )
}
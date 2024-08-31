import { renderPage } from "./template";
import { getDueToday } from "../lib/todo";

export default function () {
    renderPage(
        'Today',
        () => getDueToday(),
    )
}
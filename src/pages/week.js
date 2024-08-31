import { renderPage } from "./template";
import { getDueThisWeek } from "../lib/todo";

export default function () {
    renderPage(
        'Due this week',
        () => getDueThisWeek(),
    )
}
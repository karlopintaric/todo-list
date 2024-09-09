import { getAllToDos, getDueToday, getDueThisWeek } from "../lib/todo";

const pageMap = {
    'home': {
        title: 'Home',
        fetchFunc: () => getAllToDos()
    },
    'today': {
        title: 'Due today',
        fetchFunc: () => getDueToday()
    },
    'week': {
        title: 'Due this week',
        fetchFunc: () => getDueThisWeek()
    },
};

export default pageMap;
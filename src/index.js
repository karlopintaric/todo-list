import './styles.css';
import ToDoApp from './lib/todo';

const app = ToDoApp();
//app.deleteAll();
app.createToDo({'title': 'test', 'description': 'test'})
//app.newToDo({'title': 'test', 'description': 'test'})
//app.changeToDo(1, {'title': 'An actual title', 'done': true})
//app.deleteToDo(0);
console.log(app.getAllToDos())
import Todos from './pages/Todos'
import AddTodo from './pages/AddTodo'

export default {
    mode: 'history',
    routes: [
        { path: '/', component: Todos },
        { path: '/add', component: AddTodo },
    ]  
} 

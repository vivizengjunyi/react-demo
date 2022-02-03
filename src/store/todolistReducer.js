/**
 * todos data
 * @type {Array}
 * @desc
 * [
 * {
 *  id: 1,
 * title: 'Todo 1',
 * completed: false
 * }
 * ]
 */
const defaultState = {
    todos: [],
    keyword: '',
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'todolist/created':
            return {
                ...state,
                todos: [...state.todos, { ...action.payload, id: state.todos.length + 1 }],
            };
        case 'todolist/completed':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            completed: action.payload.completed
                        };
                    }
                    return todo;
                })
            };
        case 'todolist/deleted':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            };
        case 'todolist/edited':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            title: action.payload.title
                        };
                    }
                    return todo;
                })
            }
        default:
            return state;
    }
}
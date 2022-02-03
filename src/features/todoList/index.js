import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export default function TodoList() {
    const todoList = useSelector(state => state.todolist.todos);
    const dispatch = useDispatch();
    const [isCreateNew, setIsCreateNew] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [editId, setEditId] = useState('');
    const editInputRef = useRef(null);
    const createNewTodo = () => {
        setIsCreateNew(true);
    }
    const newTodoTitleChanged = (e) => {
        setNewTodoTitle(e.target.value);
    }
    const saveNewTodo = () => {
        dispatch({
            type: 'todolist/created',
            payload: {
                title: newTodoTitle,
                completed: false
            }
        });
        cancel();
    }
    const cancel = () => {
        setIsCreateNew(false);
    }
    const saveEdit = (todo) => {
        dispatch({
            type: 'todolist/edited',
            payload: {
                id: todo.id,
                title: editInputRef.current.value
            }
        })
        setEditId('');
        setNewTodoTitle('');
    }
    return <div className="container">
        <div className="row">
            <div className="col s12">
                <button className="btn" onClick={createNewTodo}>Create</button>
            </div>
        </div>
        <div className="row">
            {/* display todo list data */}
            <div className="col s12">
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Completed</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList.map(todo => editId !== todo.id ? <tr key={todo.id}>
                                <td><label>
                                    <input type="checkbox" onChange={e => dispatch({
                                        type: 'todolist/completed',
                                        payload: {
                                            id: todo.id,
                                            completed: e.target.checked
                                        }
                                    })} checked={todo.completed} />
                                    <span></span>
                                </label></td>
                                <td>{todo.title}</td>
                                <td>
                                    <button className="btn" onClick={() => dispatch(
                                        {
                                            type: 'todolist/deleted',
                                            payload: {
                                                id: todo.id
                                            }
                                        }
                                    )}>Delete</button>&nbsp;
                                    <button className="btn" onClick={() => setEditId(todo.id)}>Edit</button>
                                </td>
                            </tr> : <tr key={todo.id}>
                                <td></td>
                                <td><label>
                                    <input type="input" defaultValue={todo.title} ref={editInputRef} />
                                    <span></span>
                                </label></td>
                                <td>
                                    <button className="btn" onClick={() => saveEdit(todo)}>Save</button>&nbsp;
                                    <button className="btn" onClick={() => setEditId('')}>Cancel</button>
                                </td>
                            </tr>
                            )
                        }
                        {
                            isCreateNew && <tr>
                                <td>
                                    <input type="text" value={newTodoTitle} onChange={newTodoTitleChanged} />
                                </td>
                                <td>
                                    <button className="btn" onClick={saveNewTodo}>Save</button>&nbsp;
                                    <button className="btn" onClick={cancel}>Cancel</button>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>

    </div>
}
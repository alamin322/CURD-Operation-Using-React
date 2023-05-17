import React, { useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: inputValue
            };

            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h1>Todo App</h1>

            <input type="text" value={inputValue} onChange={handleInputChange} />

            <button onClick={handleAddTodo}>Add Todo</button>

            <ul>
                
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default TodoApp;

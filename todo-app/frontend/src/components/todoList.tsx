'use client';

import { useState, useEffect } from 'react';
import TodoItem from './todoItem';
import TodoForm from './todoForm';
import { Todo } from '@/types/todo';
import { getTodos } from '@/lib/api';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data || []);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setTodos([]);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl text-black font-bold mb-4">Todo List</h1>
            <TodoForm onAdd={fetchTodos} />
            <div className="mt-4">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdate={fetchTodos}
                        onDelete={fetchTodos}
                    />
                ))}
            </div>
        </div>
    );
}
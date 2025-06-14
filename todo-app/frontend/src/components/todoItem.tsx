'use client';

import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
    onUpdate: () => void;
    onDelete: () => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
    const toggleComplete = async () => {
        try {
            await fetch(`http://localhost:8080/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...todo,
                    completed: !todo.completed,
                }),
            });
            onUpdate();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async () => {
        try {
            await fetch(`http://localhost:8080/todos/${todo.id}`, {
                method: 'DELETE',
            });
            onDelete();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="flex flex-col p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={toggleComplete}
                        className="mr-2"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : 'text-black'}>
                        {todo.title}
                    </span>
                </div>
                <button
                    onClick={deleteTodo}
                    className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
                    >
                    削除
                </button>
            </div>
            {todo.description && (
                <p className="mt-2 text-gray-600 text-sm">
                    {todo.description}
                </p>
            )}
        </div>
    );
}
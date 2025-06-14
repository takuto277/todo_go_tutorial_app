'use client';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onUpdate: () => void;
    onDelete: () => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
    const toggleComplete = () => {
        try {
            await fetch(`http:/localhost:8080/todo/${todo.id}`, {
                method: 'PUT',
                header: {
                    `Content-Type`: 'application/json',
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
            await fetch(`http:/localhost:8080/todo/${todo.id}`, {
                method: 'DELETE',
            });
            onDelete();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded shadow">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={toggleComplete}
                    className="mr-2"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
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
    )
}
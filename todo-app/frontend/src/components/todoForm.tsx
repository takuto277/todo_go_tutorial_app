`use client`

import { useState } from 'react';

interface TodoFormProps {
    onAdd: () => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
    }

    try {
        await fetch('http://localhost:8080/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        setTitle('');
        onAdd();
    } catch (error) {
        console.error('Error adding todo:', error);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
                className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                追加
            </button>
        </form>
    );
}
`use client`

import { useState } from 'react';

interface TodoFormProps {
    onAdd: () => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await fetch('http://localhost:8080/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    title,
                    description
                 }),
            });
            setTitle('');
            setDescription('');
            onAdd();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
                className="w-full p-2 border border-gray-300 rounded text-black"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a new description"
                className="w-full p-2 border border-gray-300 rounded text-black"
                rows={3}
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
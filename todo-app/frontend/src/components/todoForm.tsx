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

}
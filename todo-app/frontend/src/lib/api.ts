import { Todo } from '@/types/todo';

const API_BASE_URL = 'http://localhost:8080';



export const getTodos = async () => {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};

export const createTodo = async (title: string, description: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            title,
            description
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return response.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
};
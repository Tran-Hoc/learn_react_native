

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    token?: string;
}

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface ApiTodo {
    id: number;
    title: string;
    completed: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface CounterState{
    value: number;
    step: number;
}

export interface UserState {
    currentUser: User | null;
    isLoading: boolean;
    error: string| null;
    isAuthenticated: boolean;
}

export interface TodoState{
    items: Todo[];
    isLoading: boolean;
    error: string | null;
    filter: TodoFilter;
}


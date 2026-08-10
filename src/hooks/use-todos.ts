import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'expo-multi-app.todos.v1';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type TodoFilter = 'all' | 'active' | 'completed';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value) setTodos(JSON.parse(value) as Todo[]);
      })
      .catch(() => setTodos([]))
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady) void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [isReady, todos]);

  const addTodo = useCallback((title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return null;

    const todo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((current) => [todo, ...current]);
    return todo;
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);

  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      }),
    [filter, todos],
  );

  return { todos, visibleTodos, filter, setFilter, isReady, addTodo, toggleTodo, deleteTodo };
}

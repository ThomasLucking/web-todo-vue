import { ref } from "vue";
import type { Todo } from "../api/api";
import { saveTodo, getTodos, updateTodo, deleteTodo } from "../api/api";

export function useTodos() {
  const todos = ref<Todo[]>([]);

  const fetchTodos = async () => {
    todos.value = await getTodos();
  };

  const addTodo = async (title: string, description: string) => {
    if (!title.trim()) return;

    const data = {
      id: Date.now(),
      title,
      description,
    } as Todo;

    await saveTodo(data);
    await fetchTodos();
  };

  const removeTodo = async (id: number, todo: Todo) => {
    const previous = todos.value;
    // in terms of ui it deletes all the todos that are not equal to the id I am deleting, which triggers a re render.
    todos.value = todos.value.filter((t) => t.id !== id);
    try {
      await deleteTodo(id, todo);
    } catch {
      todos.value = previous;
      console.error("unable to delete todo");
    }
  };

  const completeTodo = async (id: number, todo: Todo) => {
    const previous = todo.completed;
    try {
      await updateTodo(id, { completed: todo.completed });
    } catch {
      todo.completed = previous;
      console.error("unable to update todo.");
    }
  };

  return { todos, fetchTodos, addTodo, removeTodo, completeTodo };
}

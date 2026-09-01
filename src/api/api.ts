export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const saveTodo = async (data: Todo) => {
  const url = "http://localhost:3000/todos";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const updateTodo = async (id: number, data: Partial<Todo>) => {
  const url = `http://localhost:3000/todos/${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.status}`);
  }

  return response.json();
};

export const deleteTodo = async (id: number, data: Todo) => {
  const url = `http://localhost:3000/todos/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const getTodos = async () => {
  const url = "http://localhost:3000/todos";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.map((todo: Todo) => ({ ...todo, completed: Boolean(todo.completed) }));
};

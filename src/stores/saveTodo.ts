export interface Todo {
  id: number;
  title: string;
  description: string;
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


export const getTodos = async () => {
  const url = "http://localhost:3000/todos";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

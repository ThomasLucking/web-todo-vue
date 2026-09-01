<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from './stores/saveTodo';

const title = ref("");
const description = ref("");
const completed = ref(false);

import { onMounted } from 'vue';
import { saveTodo, getTodos, updateTodo, deleteTodo } from './stores/saveTodo';

const todos = ref<Todo[]>([]);

const fetchTodos = async () => {
  const data = await getTodos();
  todos.value = data;
};

const addTodo = async () => {
  if (!title.value.trim()) return;

  const data = {
    id: Date.now(),
    title: title.value,
    description: description.value,
  } as Todo;

  await saveTodo(data);
  await fetchTodos();

  title.value = "";
  description.value = "";
};

const deletetodo = async (id: number, todo: Todo) => {
  const previous = todos.value
  // in terms of ui it deletes all the todos that are not equal to the id I am deleting, which triggers a re render.
  todos.value = todos.value.filter(t => t.id !== id)
  try {
    await deleteTodo(id, todo)
  } catch {
    todos.value = previous;
    console.error('unable to delete todo');

  }
}

const completeTodo = async (id: number, todo: Todo) => {
  const previous = todo.completed;
  try {
    await updateTodo(id, { completed: todo.completed });
  } catch {
    todo.completed = previous;
    console.error('unable to update todo.');
  }
};


onMounted(() => {
  fetchTodos();

})

</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex justify-center px-4 py-12">
    <div class="w-full max-w-md flex flex-col gap-6">
      <h1 class="text-2xl font-semibold">Todo List</h1>

      <form class="flex flex-col gap-4 rounded-lg border border-border bg-card p-4" @submit.prevent="addTodo">
        <div class="flex flex-col gap-1.5">
          <label for="title" class="text-sm font-medium">Title</label>
          <input v-model="title" id="title" type="text" placeholder="e.g. Buy groceries"
            class="rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="description" class="text-sm font-medium">Description</label>
          <textarea v-model="description" id="description" rows="3" placeholder="Add any extra details..."
            class="resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"></textarea>
        </div>
        <button type="submit"
          class="self-end rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Add Todo
        </button>
      </form>

      <div class="flex flex-col gap-2">
        <h2 class="text-sm font-medium text-muted-foreground">Todos</h2>
        <ul class="flex flex-col gap-2 rounded-lg border border-border bg-card p-2 min-h-40">
          <li v-for="todo in todos" :key="todo.id" class="flex items-start gap-3 rounded-md p-2">
            <input type="checkbox" class="mt-1 size-4 rounded border-input" v-model="todo.completed"
              @change="completeTodo(todo.id, todo)" />
            <div class="flex flex-col flex-1" :class="{ 'opacity-50 line-through': todo.completed }">
              <span class="text-sm font-medium">{{ todo.title }}</span>
              <span class="text-sm text-muted-foreground">{{ todo.description }}</span>
            </div>
            <button type="button" @click="deletetodo(todo.id, todo)"
              class="text-sm font-medium text-destructive hover:opacity-70">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

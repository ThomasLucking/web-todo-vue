<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from './stores/saveTodo';
const title = ref("")
const description = ref("")

import { onMounted } from 'vue';
import { saveTodo, getTodos } from './stores/saveTodo';

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
          <li v-for="todo in todos" :key="todo.id" class="flex items-start gap-3 rounded-md p-2"> <input type="checkbox"
              class="mt-1 size-4 rounded border-input" />
            <div class="flex flex-col">
              <span class="text-sm font-medium">{{ todo.title }}</span>
              <span class="text-sm text-muted-foreground">{{ todo.description }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

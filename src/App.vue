<script setup lang="ts">
import { onMounted } from 'vue';
import type { Todo } from './api/api.ts';
import { useTodos } from './composables/useTodos';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';

const { todos, fetchTodos, addTodo, removeTodo, completeTodo } = useTodos();

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex justify-center px-4 py-12">
    <div class="w-full max-w-md flex flex-col gap-6">
      <h1 class="text-2xl font-semibold">Todo List</h1>

      <TodoForm @submit="addTodo" />

      <TodoList :todos="todos" @toggle="(todo: Todo) => completeTodo(todo.id, todo)"
        @remove="(todo: Todo) => removeTodo(todo.id, todo)" />
    </div>
  </div>
</template>

<style scoped></style>

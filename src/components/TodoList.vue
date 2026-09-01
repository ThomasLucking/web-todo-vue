<script setup lang="ts">
import type { Todo } from '../api/api.ts';
import TodoItem from './TodoItem.vue';

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  toggle: [todo: Todo];
  remove: [todo: Todo];
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-sm font-medium text-muted-foreground">Todos</h2>
    <ul class="flex flex-col gap-2 rounded-lg border border-border bg-card p-2 min-h-40">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="emit('toggle', $event)"
        @remove="emit('remove', $event)" />
    </ul>
  </div>
</template>

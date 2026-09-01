<script setup lang="ts">
import type { Todo } from '../api/api';

defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  toggle: [todo: Todo];
  remove: [todo: Todo];
}>();
</script>

<template>
  <li class="flex items-start gap-3 rounded-md p-2">
    <input type="checkbox" class="mt-1 size-4 rounded border-input" v-model="todo.completed"
      @change="emit('toggle', todo)" />
    <div class="flex flex-col flex-1" :class="{ 'opacity-50 line-through': todo.completed }">
      <span class="text-sm font-medium">{{ todo.title }}</span>
      <span class="text-sm text-muted-foreground">{{ todo.description }}</span>
    </div>
    <button type="button" @click="emit('remove', todo)" class="text-sm font-medium text-destructive hover:opacity-70">
      Delete
    </button>
  </li>
</template>

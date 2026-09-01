<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  submit: [title: string, description: string];
}>();

const title = ref("");
const description = ref("");

const onSubmit = () => {
  if (!title.value.trim()) return;

  emit('submit', title.value, description.value);

  title.value = "";
  description.value = "";
};
</script>

<template>
  <form class="flex flex-col gap-4 rounded-lg border border-border bg-card p-4" @submit.prevent="onSubmit">
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
</template>

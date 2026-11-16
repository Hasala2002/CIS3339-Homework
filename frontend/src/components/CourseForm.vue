<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['submit']);
const form = reactive({ courseId: '', name: '' });

// parent calls this after a successful add
function reset() {
  form.courseId = '';
  form.name = '';
}
defineExpose({ reset });
</script>

<template>
  <form @submit.prevent="emit('submit', { ...form })">
    <label>Course ID <input v-model="form.courseId" required /></label>
    <label>Course name <input v-model="form.name" required /></label>
    <button type="submit">Add course</button>
  </form>
</template>

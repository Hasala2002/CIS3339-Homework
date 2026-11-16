<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['submit']);
const form = reactive({ name: '', studentId: '', phone: '', zip: '' });

function onSubmit() {
  emit('submit', { ...form });
}

// parent calls this after a successful add
function reset() {
  Object.keys(form).forEach((k) => (form[k] = ''));
}
defineExpose({ reset });
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label>Name <input v-model="form.name" required /></label>
    <label>Student ID <input v-model="form.studentId" required /></label>
    <label>Phone <input v-model="form.phone" required /></label>
    <label>ZIP code <input v-model="form.zip" required /></label>
    <button type="submit">Add student</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStudentsStore } from '../stores/students';
import StudentForm from '../components/StudentForm.vue';
import StatusMessage from '../components/StatusMessage.vue';

const store = useStudentsStore();
const form = ref(null);
const search = ref('');
const error = ref('');
const success = ref('');

// run an action and show whatever happened
async function run(fn, okMessage) {
  error.value = '';
  success.value = '';
  try {
    await fn();
    success.value = okMessage;
    return true;
  } catch (e) {
    error.value = e.message;
    return false;
  }
}

async function add(student) {
  if (await run(() => store.addStudent(student), 'Student added')) form.value.reset();
}

onMounted(() => run(() => store.fetchStudents(), ''));
</script>

<template>
  <h1>Students</h1>
  <StatusMessage :error="error" :success="success" />

  <h2>Add a student</h2>
  <StudentForm ref="form" @submit="add" />

  <h2>Search</h2>
  <form @submit.prevent="run(() => store.fetchStudents(search), '')">
    <label>Name <input v-model="search" /></label>
    <button type="submit">Search</button>
  </form>

  <p v-if="store.loading">Loading...</p>
  <p v-else-if="!store.students.length">No students found.</p>
  <ul v-else>
    <li v-for="s in store.students" :key="s._id">
      {{ s.name }} (ID {{ s.studentId }}), {{ s.phone }}, {{ s.zip }}
      <button :aria-label="`Delete ${s.name}`" @click="run(() => store.deleteStudent(s._id), 'Student deleted')">Delete</button>
    </li>
  </ul>
</template>

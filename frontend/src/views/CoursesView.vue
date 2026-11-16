<script setup>
import { ref, onMounted } from 'vue';
import { useCoursesStore } from '../stores/courses';
import CourseForm from '../components/CourseForm.vue';
import StatusMessage from '../components/StatusMessage.vue';

const store = useCoursesStore();
const form = ref(null);
const error = ref('');
const success = ref('');

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

async function add(course) {
  if (await run(() => store.addCourse(course), 'Course added')) form.value.reset();
}

onMounted(() => run(() => store.fetchCourses(), ''));
</script>

<template>
  <h1>Courses</h1>
  <StatusMessage :error="error" :success="success" />

  <h2>Add a course</h2>
  <CourseForm ref="form" @submit="add" />

  <h2>All courses</h2>
  <p v-if="store.loading">Loading...</p>
  <p v-else-if="!store.courses.length">No courses yet.</p>
  <ul v-else>
    <li v-for="c in store.courses" :key="c._id">
      {{ c.courseId }} - {{ c.name }}
      <button @click="run(() => store.deleteCourse(c._id), 'Course deleted')">Delete</button>
    </li>
  </ul>
</template>

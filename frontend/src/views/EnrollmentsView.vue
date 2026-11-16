<script setup>
import { ref, onMounted } from 'vue';
import { useStudentsStore } from '../stores/students';
import { useCoursesStore } from '../stores/courses';
import { useEnrollmentsStore } from '../stores/enrollments';
import StatusMessage from '../components/StatusMessage.vue';

const students = useStudentsStore();
const courses = useCoursesStore();
const enrollments = useEnrollmentsStore();

const studentId = ref('');
const courseId = ref('');
const rosterCourse = ref('');
const error = ref('');
const success = ref('');

async function run(fn, okMessage) {
  error.value = '';
  success.value = '';
  try {
    await fn();
    success.value = okMessage;
  } catch (e) {
    error.value = e.message;
  }
}

async function enroll() {
  await run(() => enrollments.enroll(studentId.value, courseId.value), 'Student enrolled');
  // refresh roster if we're looking at that course
  if (rosterCourse.value === courseId.value) await enrollments.fetchRoster(courseId.value);
}

// dropdowns come from the backend
onMounted(() => run(() => Promise.all([students.fetchStudents(), courses.fetchCourses()]), ''));
</script>

<template>
  <h1>Enrollments</h1>
  <StatusMessage :error="error" :success="success" />

  <h2>Enroll a student</h2>
  <form @submit.prevent="enroll">
    <label>
      Student
      <select v-model="studentId" required>
        <option value="" disabled>Select a student</option>
        <option v-for="s in students.students" :key="s._id" :value="s._id">
          {{ s.name }} ({{ s.studentId }})
        </option>
      </select>
    </label>
    <label>
      Course
      <select v-model="courseId" required>
        <option value="" disabled>Select a course</option>
        <option v-for="c in courses.courses" :key="c._id" :value="c._id">
          {{ c.courseId }} - {{ c.name }}
        </option>
      </select>
    </label>
    <button type="submit">Enroll</button>
  </form>

  <h2>Course roster</h2>
  <label>
    Course
    <select v-model="rosterCourse" @change="run(() => enrollments.fetchRoster(rosterCourse), '')">
      <option value="">Select a course</option>
      <option v-for="c in courses.courses" :key="c._id" :value="c._id">
        {{ c.courseId }} - {{ c.name }}
      </option>
    </select>
  </label>

  <p v-if="enrollments.loading">Loading...</p>
  <p v-else-if="rosterCourse && !enrollments.roster.length">No students enrolled in this course.</p>
  <ul v-else>
    <li v-for="e in enrollments.roster" :key="e._id">
      {{ e.student.name }} ({{ e.student.studentId }})
    </li>
  </ul>
</template>

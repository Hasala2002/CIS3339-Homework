import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '../api';

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref([]);
  const loading = ref(false);

  async function fetchCourses() {
    loading.value = true;
    try {
      courses.value = await api('/api/courses');
    } finally {
      loading.value = false;
    }
  }

  async function addCourse(course) {
    await api('/api/courses', { method: 'POST', body: course });
    await fetchCourses();
  }

  async function deleteCourse(id) {
    await api('/api/courses/' + id, { method: 'DELETE' });
    courses.value = courses.value.filter((c) => c._id !== id);
  }

  return { courses, loading, fetchCourses, addCourse, deleteCourse };
});

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '../api';

export const useEnrollmentsStore = defineStore('enrollments', () => {
  const roster = ref([]);
  const loading = ref(false);

  async function fetchRoster(courseId) {
    if (!courseId) {
      roster.value = [];
      return;
    }
    loading.value = true;
    try {
      roster.value = await api('/api/enrollments?course=' + courseId);
    } finally {
      loading.value = false;
    }
  }

  async function enroll(student, course) {
    await api('/api/enrollments', { method: 'POST', body: { student, course } });
  }

  return { roster, loading, fetchRoster, enroll };
});

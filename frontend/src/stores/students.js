import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '../api';

export const useStudentsStore = defineStore('students', () => {
  const students = ref([]);
  const loading = ref(false);

  async function fetchStudents(name = '') {
    loading.value = true;
    try {
      students.value = await api('/api/students?name=' + encodeURIComponent(name));
    } finally {
      loading.value = false;
    }
  }

  async function addStudent(student) {
    await api('/api/students', { method: 'POST', body: student });
    await fetchStudents();
  }

  async function deleteStudent(id) {
    await api('/api/students/' + id, { method: 'DELETE' });
    students.value = students.value.filter((s) => s._id !== id);
  }

  return { students, loading, fetchStudents, addStudent, deleteStudent };
});

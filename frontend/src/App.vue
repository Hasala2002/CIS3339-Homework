<script setup>
</script>

<template>
  <nav>
    <RouterLink to="/students">Students</RouterLink>
    <RouterLink to="/courses">Courses</RouterLink>
    <RouterLink to="/enrollments">Enrollments</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

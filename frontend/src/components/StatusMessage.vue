<script setup>
defineProps({ error: String, success: String });
</script>

<template>
  <p v-if="error" class="msg error" role="alert">{{ error }}</p>
  <p v-else-if="success" class="msg success" role="status">{{ success }}</p>
</template>

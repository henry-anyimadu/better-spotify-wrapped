<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const store = useAuthStore();

store.logout();
</script>

<template>

</template>

<style scoped>

</style>

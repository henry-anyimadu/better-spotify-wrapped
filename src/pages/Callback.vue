<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');

  if (accessToken) {
    authStore.setAccessToken(accessToken);
    router.push('/');
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <p>Logging you in...</p>
  </div>
</template>

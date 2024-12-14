<script setup lang="ts">
import { useSpotifyAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import LoginButton from '../components/LoginButton.vue';

const authStore = useSpotifyAuthStore();
const router = useRouter();

if (authStore.accessToken) {
  router.push('/top-items');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-8">Welcome to Spotify Stats</h1>
      <div v-if="!authStore.accessToken">
        <LoginButton />
      </div>
    </div>
  </div>
</template>

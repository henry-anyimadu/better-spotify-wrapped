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
  <div class="bg-hero-pattern min-h-screen flex items-center justify-left">
    <div class="text-left px-10">
      <h1 class="text-4xl text-white font-bold  mb-8">Welcome to Wrapify</h1>
      <div v-if="!authStore.accessToken">
        <LoginButton />
      </div>
    </div>
  </div>
</template>

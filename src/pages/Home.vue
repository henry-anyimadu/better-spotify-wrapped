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
  <div class="bg-slate-950 min-h-screen flex items-center justify-center">
    <div class="bg-slate-800 text-center px-10 pt-20 pb-28 rounded-3xl border-2 border-green-600 shadow-xl shadow-green-900">
      <h1 class="text-4xl text-white font-bold  mb-8">Welcome to Wrapify</h1>
      <h3 class="text-xl text-gray-200 mb-8">Your actual Spotify stats.</h3>
      <div v-if="!authStore.accessToken">
        <LoginButton />
      </div>
    </div>
  </div>
</template>

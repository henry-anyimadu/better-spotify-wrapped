<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import LoginButton from '../components/LoginButton.vue';

const authStore = useAuthStore();
const router = useRouter();

const goToTopItems = () => {
  router.push('/top-items');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-8">Welcome to Spotify Stats</h1>
      <div v-if="!authStore.isAuthenticated">
        <LoginButton />
      </div>
      <div v-else>
        <button
            @click="goToTopItems"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          View Your Top Items
        </button>
      </div>
    </div>
  </div>
</template>

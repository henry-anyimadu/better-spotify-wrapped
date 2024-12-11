<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-8">Welcome to Better Wrapped</h1>
      <div v-if="!authStore.isAuthenticated">
        <LoginButton />
      </div>
      <div v-else>
        <p class="text-xl mb-4">You're logged in!</p>
        <!-- Add navigation to top tracks/artists here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import LoginButton from '../components/LoginButton.vue';

const authStore = useAuthStore();
</script>

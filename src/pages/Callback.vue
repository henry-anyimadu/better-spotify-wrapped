<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSpotifyAuthStore } from '../stores/auth';
import axios from "axios";

const router = useRouter();
const authStore = useSpotifyAuthStore();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
});

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code) {
    console.error('No authorization code found');
    router.push('/');
    return;
  }

  try {
    console.log('Exchanging code for tokens...');
    const response = await api.get(`/api/spotify/callback`, {
      params: { code },
    });

    if (!response.data.access_token) {
      throw new Error('No access token in response');
    }

    console.log('Token exchange successful');

    // Store tokens in auth store
    authStore.setTokens(
        response.data.access_token,
        response.data.refresh_token
    );

    // Verify token was stored
    console.log('Token stored:', !!authStore.accessToken);

    // Small delay to ensure store is updated
    await new Promise(resolve => setTimeout(resolve, 100));

    // Redirect to main app
    router.push('/top-items');
  } catch (error) {
    console.error('Token exchange failed:', error);
    router.push('/');
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-600 mb-2">Logging you in...</p>
      <div class="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
</template>

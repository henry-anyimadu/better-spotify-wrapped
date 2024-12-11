<script setup lang="ts">
import { loginWithSpotify } from '../services/spotify';
</script>

<template>
  <button
      @click="loginWithSpotify"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
  >
    <span>Login with Spotify</span>
  </button>
</template>

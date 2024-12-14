<script setup lang="ts">
import { useRouter } from 'vue-router';
import {useSpotifyAuthStore} from "../stores/auth.ts";

const store = useSpotifyAuthStore()
const router = useRouter()

async function logout() {
  console.log('logging out...')
  store.logout()
  router.push('/')
}

</script>

<template>
  <button
      @click="logout"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
  >
    <span>Return to Home</span>
  </button>
</template>

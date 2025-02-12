<script setup lang="ts">
import axios from 'axios'
import { config } from '../config/environment'

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})

async function login() {
  console.log('attempting login...')
  try {
    // Get Spotify auth URL from backend
    const response = await api.get(`/api/spotify/login`)

    if (response.data.authUrl) {
      window.location.href = response.data.authUrl
    }
  }
  catch (error) {
    console.error('Login failed :', error)
  }
}

</script>

<template>
  <button
      @click="login"
      class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 w-fit mx-auto"
  >
    <span>Developer Access</span>
  </button>
</template>

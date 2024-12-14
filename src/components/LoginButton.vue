<script setup lang="ts">
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
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
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
  >
    <span>Login with Spotify</span>
  </button>
</template>

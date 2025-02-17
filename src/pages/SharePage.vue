<template>
  <Suspense fallback="loading">
    <!-- Share page. Eventually there will be a button on another page leading here, but for now it is
    accessible via /share -->
  <div class="min-h-screen bg-gradient-to-br from-purple-400 via-red-500 to-orange-400 py-8">
    <div class="container mx-auto max-w-4xl px-4">
      <!-- Loading State -->
      <div v-if="userStatsStore.isLoading" class="text-center py-12">
        <div class="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-white mt-4">Loading your stats...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="userStatsStore.error"
        class="text-center py-12"
      >
        <p class="text-red-500">{{ userStatsStore.error }}</p>
        <button
          @click="retryLoad"
          class="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Try Again
        </button>
      </div>

      <!-- Content -->
      <template v-else>
        <h1 class="text-3xl font-bold text-white text-center mb-8">
          Share Your Wrapify Stats
        </h1>
          <ShareCard />

        <div class="text-center mt-8">
          <router-link
            to="/top-items"
            class="text-green-400 hover:text-green-300"
          >
            ← Back to Top Items
          </router-link>
        </div>
      </template>
    </div>
  </div>
  </Suspense>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import { useSpotifyAuthStore } from '../stores/auth'
import { useUserStatsStore } from '../stores/userStats'
import ShareCard from '../components/common/ShareCard.vue'
import {Limit, TimeRange} from '@/types/filters.ts';
import {SpotifyArtist, SpotifyTrack} from "@/types/spotify.ts";
import { getTopTracks, getTopArtists } from '../services/spotify';

const router = useRouter()
const authStore = useSpotifyAuthStore()
const userStatsStore = useUserStatsStore()
// const activeTab = ref<'tracks' | 'artists'>('tracks');
// const timeRange = ref<TimeRange>('short_term');
// const limit = ref<Limit>(50);
// const tracks = ref<SpotifyTrack[]>([]);
// const artists = ref<SpotifyArtist[]>([]);

onMounted(() => {
  // Redirect to login if not authenticated
  if (!authStore.isAuthenticated) {
    router.push('/')
    return
  }

  // Fetch user stats if not already loaded
  if (userStatsStore.topTracks.length === 0) {
    loadStats()
  }
})

const loadStats = async () => {
  if (!authStore.accessToken) return

  try {
    await userStatsStore.fetchAllUserStats(authStore.accessToken)

  } catch (error) {
    console.error('Failed to load stats:', error)
  }
}

const retryLoad = () => {
  if (authStore.accessToken) {
    loadStats()
  } else {
    router.push('/')
  }
}
</script>

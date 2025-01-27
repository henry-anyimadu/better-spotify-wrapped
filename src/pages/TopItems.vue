<template>
  <div class="bg-slate-950 h-full">
    <div class=" max-w-3xl mx-auto py-4 px-4">
      <!-- Show error message if there is one -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Show loading state -->
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Loading your top items...</p>
      </div>

      <!-- Show content when not loading -->
      <template v-else>
        <div class="mb-8">
          <!-- Tab controls -->
          <div class="flex gap-4 mb-6">
            <button
                v-for="tab in ['tracks', 'artists']"
                :key="tab"
                @click="activeTab = tab as 'tracks' | 'artists'"
                :class="[
              'px-4 py-2 rounded-full font-medium transition-colors',
              activeTab === tab
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
            >
              {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
            </button>
          </div>

          <!-- Filter controls -->
          <FilterControls
              v-model:timeRange="timeRange"
              v-model:limit="limit"
          />
          <LogoutButton />
        </div>

        <!-- Content -->
        <div v-if="tracks.length === 0 && artists.length === 0 && !loading && !error" class="text-center py-8">
          <p class="text-gray-600">No items found. Try adjusting your filters.</p>
        </div>

        <TrackList
            v-else-if="activeTab === 'tracks' && tracks.length > 0"
            :tracks="tracks"
        />
        <ArtistList
            v-else-if="activeTab === 'artists' && artists.length > 0"
            :artists="artists"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Popularity Score Calculation, Shareable card w/ top songs/artists + popularity score
// TODO: Overall site redesign/UI
// TODO: Add functionality for editing info on share card (songs v artists)
// TODO:
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSpotifyAuthStore } from '../stores/auth';
import { getTopTracks, getTopArtists } from '../services/spotify';
import { SpotifyTrack, SpotifyArtist } from '../types/spotify';
import { TimeRange, Limit } from '../types/filters';
import FilterControls from '../components/common/FilterControls.vue';
import TrackList from '../components/tracks/TrackList.vue';
import ArtistList from '../components/artists/ArtistList.vue';
import LogoutButton from "../components/LogoutButton.vue";

const router = useRouter();
const authStore = useSpotifyAuthStore();
const activeTab = ref<'tracks' | 'artists'>('tracks');
const timeRange = ref<TimeRange>('medium_term');
const limit = ref<Limit>(10);
const tracks = ref<SpotifyTrack[]>([]);
const artists = ref<SpotifyArtist[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchTopItems = async () => {
  if (authStore.accessToken == undefined) {
    console.error('No access token available');
    router.push('/');
    return;
  }

  loading.value = true;
  error.value = null;
  console.log('Fetching with token:', authStore.accessToken); // Add logging

  try {
    if (activeTab.value === 'tracks') {
      const data = await getTopTracks(authStore.accessToken, timeRange.value, limit.value);
      console.log('Received tracks data:', data); // Add logging
      if (data && data.items) {
        tracks.value = data.items;
      } else {
        throw new Error('Invalid response format for tracks');
      }
    } else {
      const data = await getTopArtists(authStore.accessToken, timeRange.value, limit.value);
      console.log('Received artists data:', data); // Add logging
      if (data && data.items) {
        artists.value = data.items;
      } else {
        throw new Error('Invalid response format for artists');
      }
    }
  } catch (err: any) {
    console.error('Error fetching top items:', err);
    error.value = err.response?.status === 401
        ? 'Your session has expired. Please log in again.'
        : 'Failed to load your top items. Please try again.';

    if (err.response?.status === 401) {
      authStore.logout();
      router.push('/');
    }
  } finally {
    loading.value = false;
  }
};

// Call fetchTopItems when component mounts
onMounted(() => {
  console.log('Component mounted, checking auth...'); // Add logging
  if (!authStore.accessToken) {
    console.log('No access token found, redirecting to login');
    router.push('/');
    return;
  }
  fetchTopItems();
});

// Watch for changes in filters
watch([activeTab, timeRange, limit], () => {
  fetchTopItems();
});
</script>

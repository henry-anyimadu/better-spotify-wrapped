<template>
  <div class="h-full">
    <div class=" max-w-full mx-auto py-4 px-4">
      <!-- Show error message if there is one -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Show loading state -->
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Loading your top items...</p>
      </div>

      <!-- Show content when not loading -->
      <template v-else class="flex">
        <div class="mb-8">
          <!-- Tab controls -->
          <div class="flex justify-center gap-4 mb-6">
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
          class="justify-center"
        />

        <!-- Action buttons container -->
        <div class="flex gap-4 justify-center">
          <button
            @click="router.push('/share')"
            class="bg-green-500 text-white px-4 py-2 rounded-full font-medium transition-colors hover:bg-green-600">
            <PhExport :size="32" />
          </button>
          <LogoutButton />
        </div>


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
import {PhExport} from "@phosphor-icons/vue";

const router = useRouter();
const authStore = useSpotifyAuthStore();
const activeTab = ref<'tracks' | 'artists'>('tracks');
const timeRange = ref<TimeRange>('short_term');
const limit = ref<Limit>(50);
const tracks = ref<SpotifyTrack[]>([]);
const artists = ref<SpotifyArtist[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchTopItems = async () => {
  if (authStore.accessToken == undefined) {
    console.error('No access token available');
    await router.push('/');
    return;
  }

  loading.value = true;
  error.value = null;
  console.log('Fetching with token');

  try {
    if (activeTab.value === 'tracks') {
      const data = await getTopTracks(authStore.accessToken, timeRange.value, limit.value);
      console.log('Received tracks data');
      if (data && data.items) {
        tracks.value = data.items;
      } else {
        throw new Error('Invalid response format for tracks');
      }
    } else {
      const data = await getTopArtists(authStore.accessToken, timeRange.value, limit.value);
      console.log('Received artists data');
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
      await router.push('/');
    }
  } finally {
    loading.value = false;
  }
};

// Call fetchTopItems when component mounts
onMounted(() => {
  console.log('Component mounted, checking auth...');
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

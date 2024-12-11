<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { getTopTracks, getTopArtists } from '../services/spotify';
import { SpotifyTrack, SpotifyArtist } from '../types/spotify';
import { TimeRange, Limit } from '../types/filters';
import FilterControls from '../components/common/FilterControls.vue';
import TrackList from '../components/tracks/TrackList.vue';
import ArtistList from '../components/artists/ArtistList.vue';
const authStore = useAuthStore();
const activeTab = ref<'tracks' | 'artists'>('tracks');
const timeRange = ref<TimeRange>('medium_term');
const limit = ref<Limit>(10);
const tracks = ref<SpotifyTrack[]>([]);
const artists = ref<SpotifyArtist[]>([]);
const loading = ref(false);

const fetchTopItems = async () => {
  if (!authStore.accessToken) return;

  loading.value = true;
  try {
    if (activeTab.value === 'tracks') {
      const data = await getTopTracks(authStore.accessToken, timeRange.value, limit.value);
      tracks.value = data.items;
    } else {
      const data = await getTopArtists(authStore.accessToken, timeRange.value, limit.value);
      artists.value = data.items;
    }
  } catch (error) {
    console.error('Error fetching top items:', error);
  }
  loading.value = false;
};

watch([activeTab, timeRange, limit], fetchTopItems);
fetchTopItems();
</script>

<template>
  <div class="max-w-3xl mx-auto py-4 px-4">
    <div class="mb-8">
      <div class="flex gap-4 mb-6">
        <button
            v-for="tab in ['tracks', 'artists']"
            :key="tab"
            @click="activeTab = tab as 'tracks' | 'artists'"
            :class="[
            'px-4 py-2 rounded-full font-medium',
            activeTab === tab
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
        </button>
      </div>

      <FilterControls
          v-model:timeRange="timeRange"
          v-model:limit="limit"
      />
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Loading...</p>
    </div>
    <template v-else>
      <TrackList
          v-if="activeTab === 'tracks'"
          :tracks="tracks"
      />
      <ArtistList
          v-else
          :artists="artists"
      />
    </template>
  </div>
</template>

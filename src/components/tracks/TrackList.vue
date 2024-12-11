<script setup lang="ts">
import { SpotifyTrack } from '@/types/spotify';

defineProps<{
  tracks: SpotifyTrack[];
}>();
</script>

<template>
  <div class="space-y-4">
    <div
        v-for="(track, index) in tracks"
        :key="track.id"
        class="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <span class="text-lg font-medium text-gray-500 w-8">{{ index + 1 }}</span>
      <img
          :src="track.album.images[0]?.url"
          :alt="track.album.name"
          class="w-8 h-8 object-cover rounded"
      />
      <div>
        <h3 class="font-medium">{{ track.name }}</h3>
        <p class="text-sm text-gray-600">
          {{ track.artists.map(artist => artist.name).join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

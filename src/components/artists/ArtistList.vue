<script setup lang="ts">
import { SpotifyArtist } from 'src/types/spotify.ts';

defineProps<{
  artists: SpotifyArtist[];
}>();
</script>

<template>
  <div class="space-y-4">
    <div
        v-for="(artist, index) in artists"
        :key="artist.id"
        class="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <span class="text-lg font-medium text-gray-500 w-8">{{ index + 1 }}</span>
      <img
          :src="artist.images[0]?.url"
          :alt="artist.name"
          class="w-8 h-8 object-cover rounded-full"
      />
      <div>
        <h3 class="font-medium">{{ artist.name }}</h3>
        <p class="text-sm text-gray-600">
          {{ artist.genres.slice(0, 3).join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

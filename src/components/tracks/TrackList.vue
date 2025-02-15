<script setup lang="ts">
import { SpotifyTrack } from '@/types/spotify';

defineProps<{
  tracks: SpotifyTrack[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 m-12 max-w-full">
    <div
        v-for="(track, index) in tracks"
        :key="track.id"
        class="flex-col items-center h-full gap-12 p-6 bg-[hsl(225,20%,10%)] border-2 border-[hsl(225,20%,50%)] rounded-lg shadow hover:shadow-md hover: transition-shadow"
    >
      <img
          :src="track.album.images[0]?.url"
          :alt="track.album.name"
          class="w-full h-3/4 object-cover pb-4 rounded"
      />
      <span class="text-xl font-extrabold text-white pb-2">{{ index + 1 }}</span>
      <div class="text-[hsl(225,20%,90%)] truncate flex-wrap">
        <h3 class="font-bold">{{ track.name }}</h3>
        <p class="text-sm">
          {{ track.artists.map(artist => artist.name).join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

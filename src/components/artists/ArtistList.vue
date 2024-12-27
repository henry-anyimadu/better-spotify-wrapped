<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {SpotifyArtist} from '../types/spotify.ts';

const props = defineProps<{
  artists: SpotifyArtist[];
}>();

const popularityScore = ref<number>(0);

async function userPopularity() {
  let totalPop = 0;

  for (let i = 0; i < props.artists.length; i++) {
    totalPop += Number(props.artists[i].popularity);
  }

  popularityScore.value = totalPop / (props.artists.length);
}
onMounted(() => {
  userPopularity();
})
</script>

<template>
  <div class="space-y-4">
    <h3 class="font-bold text-white text-xl">Your popularity score = {{popularityScore}} </h3>
    <div
        v-for="(artist, index) in artists"
        :key="artist.id"
        class="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <span class="text-lg font-medium text-gray-500 w-3 h-8">{{ index + 1 }}</span>
      <img
          :src="artist.images[1]?.url"
          :alt="artist.name"
          class="w-8 h-8 object-cover rounded-full"
      />
      <div>
        <h3 class="font-medium">{{ artist.name }} {{artist.popularity}}</h3>
        <p class="text-sm text-gray-600">
          {{ artist.genres.slice(0, 3).join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

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
<!--<h3 class="font-bold text-white text-xl">Your popularity score = {{popularityScore}} </h3>-->
<template>
  <h3 class="ml-4 font-bold text-white text-xl">Your Music Taste Rarity: {{ Math.round(popularityScore) }}%</h3>
  <br />
  <h3 class="ml-12 font-medium text-white max-w-3xl text-lg"> <strong>Rarity</strong> is the chance that another Spotify user has a
  similar music taste to you. <strong>Artist rarity</strong> is the chance that a random Spotify user has listened to that artist recently.</h3>

  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 m-12 max-w-full">
    <div
        v-for="(artist, index) in artists"
        :key="artist.id"
        class="flex-col items-center h-full gap-12 p-4 bg-[hsl(225,20%,10%)] border-[hsl(225,20%,50%)] rounded-lg shadow animate-fancy-unhover hover:animate-fancy-hover"
    >
      <img
          :src="artist.images[0]?.url"
          :alt="artist.name"
          class="w-full h-3/4 object-cover pb-4 rounded"
      />
      <span class="text-xl text-left font-extrabold text-white pb-2">{{ index + 1 }}</span>
      <br />
      <span class="text-lg text-right font-semibold text-[hsl(225,60%,60%)] pb-2">Rarity: {{ artist.popularity }}</span>
      <div class="text-[hsl(225,60%,90%)] truncate flex-wrap">
        <h3 class="font-bold text-wrap ">{{ artist.name }}</h3>
        <p class="text-sm text-gray-400">
          {{ artist.genres.slice(0, 3).join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

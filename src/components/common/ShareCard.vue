<template>
<div class="flex flex-col items-center gap-8 p-8">
  <!-- Download button (feel free to use whatever icon library you want)-->
  <button
      @click="generateCard"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    <span>Download Stats Card</span>
  </button>

    <!-- Card Preview -->
    <div
        ref="cardData"
        class="p-6 rounded-lg shadow-xl w-full max-w-xl"
        :style="{ background: bgGradient }"
    >
        <div class="flex items-center text-center gap-4">
            <div class="w-full mb-6">
                <h2 class="text-xl font-semibold text-white text-center">Last Month's top songs for {{userStatsStore.username.name}}</h2>
            </div>
        </div>

      <!-- Top Track -->
          <div
              v-for="(track, index) in userStatsStore.topTracks.slice(0,1)"
               :key="track.id || index"
              class="flex flex-col items-center w-full max-w-md mx-auto mb-8">

            <img :src="track.album.images[0]?.url " class="rounded-md h-auto w-full"  alt="Top img"/>
            <div class="w-full text-left gap-2">
              <h3 class="text-lg capitalize pt-3 font-semibold text-white">{{ track.name }}</h3>
              <p class="text-sm text-gray-400">{{ track.artists[0].name }}</p>
            </div>
          </div>

      <!-- Tracks 2-5 -->
      <div class="mt-4 grid grid-cols-2 gap-2">
        <div
            v-for="(track, index) in userStatsStore.topTracks.slice(1,5)"
            :key="track.id || index"
            class="flex items-center gap-4 bg-amber-100 bg-opacity-10 bg-blend-overlay p-3 rounded"
        >
          <span class="text-2xl font-bold text-white w-8">{{ index + 2 }}</span>
          <img
              :src="track.album.images[0]?.url"
              class="w-12 h-12 object-cover rounded"
              alt="album cover"
          />
          <div class="flex-1 min-w-0">
            <h3 class="text-white font-medium">{{ track.name }}</h3>
            <p class="text-gray-400 text-sm truncate">{{ track.artists[0].name }}</p>
          </div>
        </div>
      </div>
    </div>
</div>


</template>
<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import { useUserStatsStore } from '@/stores/userStats';
import { extractColorsFromImage, createGradientBackground } from '@/services/colorExtractor';

const userStatsStore = useUserStatsStore();
const cardData = ref<HTMLElement | null>(null);
const isGenerating = ref(false);
const topTrack = computed(() => userStatsStore.topTracks[0]);
const bgGradient = ref('linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)');

// Create background gradient
async function initializeBackground() {
  try {
    // Example image URL - replace with your actual image URL
    const [color1, color2] = await extractColorsFromImage(topTrack.value.album.images[0].url);
    bgGradient.value = createGradientBackground(color1, color2);
  } catch (error) {
    console.error('Failed to extract colors:', error);
  }
}

const generateCard = async () => {
  if (!cardData.value) {
    console.error('No card data available');
    return;
  }

  isGenerating.value = true

  try {
    const html2canvas = (await import('html2canvas')).default

    const canvas = await html2canvas(cardData.value, {
      scale: 2, // Increase resolution for better quality
      logging: false, // Set to false for prod
      useCORS: true, // Allows us to get images from Spotify
      allowTaint: true // Also helps with external images
    })

    // Link Creation
    const url = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = `wrapify-stats-${new Date().toISOString().split('T')[0]}.png`;
    link.href = url;
    link.click();

  } catch (err) {
    console.error('Error generating card:', err);
    alert('Sorry, there was an error generating your Wrapify stats. Please try again.');
  }
};

onMounted(() => {
  initializeBackground();
});
</script>

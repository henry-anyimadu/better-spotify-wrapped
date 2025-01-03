<script setup lang="ts">
import { ref } from 'vue';
import { useUserStatsStore } from '@/stores/userStats';

const cardData = ref<HTMLElement | null>(null);
const userStatsStore = useUserStatsStore();
const isGenerating = ref(false);

const generateCard = async () => {  
    if (!cardData.value) {
        console.error('No card data available');
        return;
    }

    isGenerating.value = true

    try {
        const html2canvas = (await import('html2canvas')).default

        const canvas = await html2canvas(cardData.value, {
            backgroundColor: '#121212', // In the future, this will be matched to their top song's cover
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
        alert('Sorry, there was an error generating your Wrapify. Please try again.');
    }
};

</script>
<template>
<div class="flex flex-col items-center gap-8 p-8">
    <!-- Card Preview -->
    <div 
        ref="cardData" 
        class="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md"
    >
        <div class="flex items-center text-center gap-4">
            <div class="w-full mb-6">
                <h2 class="text-xl font-semibold text-yellow-400 text-center">My top songs</h2>
            </div>
        </div>
        <!-- Top Tracks (as of now we only get the top 5 with .slice)-->
        <div 
        v-for="(track, index) in userStatsStore.topTracks.slice(0, 5)"
        :key="track.id || index"
        class="bg-slate-900 p-6 rounded mb-4"
        >
            <img
            :src="track.album.images[0]?.url "
            
            class="card-image"
            />
            <div class="flex flex-col gap-2">
                <h3 class="text-lg font-semibold text-white">{{ track.name }}</h3>
                <p class="text-sm text-gray-400">{{ track.artists[0].name }}</p>
            </div>

        </div>
    </div>
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
</div>


</template>
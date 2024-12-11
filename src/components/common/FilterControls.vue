<script setup lang="ts">
import { TimeRange, Limit } from '@/types/filters';

const props = defineProps<{
  timeRange: TimeRange;
  limit: Limit;
}>();

const emit = defineEmits<{
  (e: 'update:timeRange', value: TimeRange): void;
  (e: 'update:limit', value: Limit): void;
}>();

const timeRangeOptions = [
  { value: 'short_term', label: 'Last Month' },
  { value: 'medium_term', label: 'Last 6 Months' },
  { value: 'long_term', label: 'Last Year' },
];

const limitOptions = [5, 10, 20];
</script>

<template>
  <div class="flex gap-4 mb-6">
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium">Time Range:</label>
      <select
          :value="timeRange"
          @change="emit('update:timeRange', ($event.target as HTMLSelectElement).value as TimeRange)"
          class="rounded border-gray-300 py-1 px-2"
      >
        <option
            v-for="option in timeRangeOptions"
            :key="option.value"
            :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="flex items-center gap-2">
      <label class="text-sm font-medium">Show:</label>
      <select
          :value="limit"
          @change="emit('update:limit', Number(($event.target as HTMLSelectElement).value) as Limit)"
          class="rounded border-gray-300 py-1 px-2"
      >
        <option v-for="option in limitOptions" :key="option" :value="option">
          Top {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<template>
  <div class="custom-container">
    <h1 class="text-center">Top Erlebnisse in Deiner Nähe</h1>

    <!-- Filter options -->
    <div class="flex justify-center gap-4 my-8">
      <select v-model="selectedCity" class="p-2 border border-gray-300 rounded">
        <option value="">All Cities</option>
        <option v-for="city in uniqueCities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>

      <select
        v-model="selectedCategory"
        class="p-2 border border-gray-300 rounded"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Show some Event cards -->
    <div class="grid grid-cols-5 gap-2">
      <div
        v-for="event in filteredEvents.slice(0, 10)"
        :key="event.id"
        class="min-w-[8rem]"
      >
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const eventData = require('@/data/events.json')
const events = ref([])
const selectedCity = ref('')
const selectedCategory = ref('')
const categories = ref([])

onMounted(async () => {
  events.value = eventData

  // Extract categories from events
  const slugSet = new Set()
  eventData.forEach((event) => {
    if (event.categories && Array.isArray(event.categories)) {
      event.categories.forEach((category) => {
        slugSet.add(category.slug)
      })
    }
  })
  categories.value = Array.from(slugSet)
})

// Extract unique cities from events
const uniqueCities = computed(() => [
  ...new Set(events.value.map((event) => event.city)),
])

// Filter events based on selected city and category
const filteredEvents = computed(() => {
  let filtered = events.value

  if (selectedCity.value) {
    filtered = filtered.filter((event) => event.city === selectedCity.value)
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((event) =>
      event.categories.some(
        (category) => category.slug === selectedCategory.value
      )
    )
  }

  return filtered
})
</script>

<template>
  <div class="custom-container">
    <h1 class="text-center">Top Erlebnisse in Deiner Nähe</h1>
    <!-- Filter options -->
    <div class="flex justify-center gap-4 my-8">
      <!-- Select city filter -->
      <select v-model="selectedCity" class="p-2 border border-gray-300 rounded">
        <option value="">All Cities</option>
        <option v-for="city in uniqueCities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <!-- Select category filter -->
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
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
    >
      <div
        :data-testid="`event-card-${event.id}`"
        v-for="event in filteredEvents.slice(0, 10)"
        :key="event.id"
        class="min-w-44"
      >
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch  } from 'vue'
import { useRouter, useRoute } from '@nuxtjs/composition-api'

const route = useRoute()
const router = useRouter()

const eventData = require('@/data/events.json')
const events = ref([])
const selectedCity = ref('')
const selectedCategory = ref('')
const categories = ref([])

onMounted(async () => {
  events.value = eventData

  // Extract and sort unique categories from events
  const slugSet = new Set()
  eventData.forEach((event) => {
    if (event.categories && Array.isArray(event.categories)) {
      event.categories.forEach((category) => {
        slugSet.add(category.slug)
      })
    }
  })
  const sortedCategories = Array.from(slugSet).sort((a, b) =>
    a.localeCompare(b)
  )
  categories.value = sortedCategories

    // Set the initial selected city and category from the route
    setSelectedFromRoute()
})

// Extract and sort unique cities from events
const uniqueCities = computed(() => {
  const cities = [...new Set(events.value.map((event) => event.city))]
  return cities.sort((a, b) => a.localeCompare(b))
})

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

  // Update the URL to reflect the route change
  router.push({
  path: route.value.fullPath,
  query: { 
    city: selectedCity.value || undefined,
    category: selectedCategory.value  || undefined,
  }
})

  return filtered
})
// Set the selected city and category based on route query parameters
watch(
  () => route.value.query,
  () => {
    setSelectedFromRoute()
  }
)

function setSelectedFromRoute() {
  selectedCity.value = route.value.query.city || ''
  selectedCategory.value = route.value.query.category || ''
}

</script>

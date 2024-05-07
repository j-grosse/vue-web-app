<template>
  <div class="custom-container">
    <!-- Hero image section -->
      <img class="bg-cover bg-center mx-auto" src="@/assets/images/hero.png" />
    <!-- Filter options -->
    <div class="flex justify-center gap-4 my-8">
      <!-- Select city filter -->
      <select v-model="selectedCity" class="custom-select">
        <option value="">Alle Städte</option>
        <option v-for="city in uniqueCities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <!-- Select category filter -->
      <select v-model="selectedCategory" class="custom-select">
        <option value="">Alle Kategorien</option>
        <option
          v-for="category in uniqueCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <!-- Select rating filter -->
      <select v-model="selectedRating" class="custom-select">
        <option value="">Alle Ratings</option>
        <option v-for="rating in ratings" :key="rating" :value="rating">
          {{ rating }}
        </option>
      </select>
    </div>
    <h1 class="text-center text-left">Top Erlebnisse in Deiner Nähe</h1>
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
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from '@nuxtjs/composition-api'

const route = useRoute()
const router = useRouter()

const eventData = require('@/data/events.json')
const events = ref([])
const ratings = ref([])
const selectedCity = ref('')
const selectedCategory = ref('')
const selectedRating = ref()

onMounted(async () => {
  events.value = eventData
  ratings.value = [5, 4, 3]

  // Set the initial selected city, category and rating from the route
  setSelectedFromRoute()
})

// Extract and sort unique cities, categories
const uniqueCities = computed(() => {
  const cities = [...new Set(events.value.map((event) => event.city))]
  return cities.sort((a, b) => a.localeCompare(b))
})

const uniqueCategories = computed(() => {
  const categories = [
    ...new Set(
      events.value.flatMap((event) =>
        event.categories.map((category) => category.slug)
      )
    ),
  ]
  return categories.sort((a, b) => a.localeCompare(b))
})

// Filter events based on selected city, category and rating
const filteredEvents = computed(() => {
  let filtered = events.value

  if (selectedCity.value) {
    filtered = filtered.filter((event) => event.city === selectedCity.value)
    console.log('CITY', filtered)
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((event) =>
      event.categories.some(
        (category) => category.slug === selectedCategory.value
      )
    )
  }

  if (selectedRating.value) {
    filtered = filtered.filter((event) => event.rating >= selectedRating.value)
    console.log('RATING', filtered)
  }

  // Update the URL to reflect the route change
  router.push({
    path: route.value.fullPath,
    query: {
      city: selectedCity.value || undefined,
      category: selectedCategory.value || undefined,
      rating: selectedRating.value || undefined,
    },
  })

  return filtered
})
// Set the selected city, category and rating based on route query parameters
watch(
  () => route.value.query,
  () => {
    setSelectedFromRoute()
  }
)

function setSelectedFromRoute() {
  selectedCity.value = route.value.query.city || ''
  selectedCategory.value = route.value.query.category || ''
  selectedRating.value = route.value.query.rating || ''
}
</script>

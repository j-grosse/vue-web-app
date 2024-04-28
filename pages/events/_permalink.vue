<template>
  <div v-if="event" class="container">
    <NuxtLink to="/">
      <button
        class="bg-gray-500 hover:bg-gray-300 text-white  py-2 px-4 m-4 rounded"
      >
        go back
      </button>
    </NuxtLink>
    <h1 class="text-center mb-4">Event Details</h1>
    <h1 class="title">{{ event.title }}</h1>
    <p class="description">{{ event.subtitle }}</p>

    <div class="courseImages flex">
      <div class="principalImage">
        <img :src="principalImage" alt="event image" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="image in altImages"
          :key="image.id"
          class="nonPrincipalImages"
        >
          <img :src="image.thumb" alt="alt images" />
        </div>
      </div>
    </div>
    <div class="content">
      <ul class="details">
        <li>Adresse: {{ event.address.formatted }}</li>
        <li>Stadt: {{ event.city }}</li>
        <li>Dauer: {{ event.default_duration }} Minuten</li>
        <li>Preis: {{ event.default_price.formatted }}</li>
        <li>Rating: {{ event.rating }}</li>
        <li>Anbieter: {{ event.supplier }}</li>
        <li>Gesamtbewertungen: {{ event.totalRating }}</li>
        <li>
          Tags:
          <span v-for="tag in event.tags" :key="tag.slug">{{ tag.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '@nuxtjs/composition-api'
import eventData from '@/data/events.json'

const route = useRoute()
const permalink = ref('')
const events = ref([])
const event = ref(null)
const principalImage = computed(
  () => event.value.images.find((img) => img.isPrincipal).thumb
)
const altImages = computed(() =>
  event.value.images.filter((img) => !img.isPrincipal)
)

onMounted(async () => {
  events.value = eventData
  // access route params and find event
  permalink.value = route.value.params.permalink
  event.value = events.value.find((e) => e.permalink === permalink.value)
})

</script>

<style scoped></style>

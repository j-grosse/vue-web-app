<template>
  <div class="container">
    <div
      class="text-center word-break-word rounded-lg bg-white shadow-lg mx-auto m-4 p-3 text-xs sm:text-sm xl:text-lg"
    >
      <NuxtLink :to="`/events/${event.permalink}`">
        <img
          :src="getPrincipalEventImage(event)"
          class="m-0 auto rounded-md"
          alt="event image"
        />
        <div class="font-medium my-4">{{ event.title }}</div>
        <div class="text-left mx-2">
          <p>Dauer: {{ event.default_duration / 60 }} h</p>
          <p>Rating: {{ event.rating }}</p>
          <p>Preis: {{ event.default_price.formatted }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const getPrincipalEventImage = (event) => {
  const principalImage = event.images.find((image) => image.isPrincipal)
  return principalImage ? principalImage.thumb : ''
}
</script>

<style scoped></style>

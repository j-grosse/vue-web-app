<template>
  <div class="card text-center">
    <NuxtLink :to="`/events/${event.permalink}`">
      <img
        :src="getPrincipalEventImage(event)"
        class="thumb rounded-md"
        alt="event image"
      />
      <div class="font-medium my-4">{{ event.title }}</div>
      <!-- <Icon icon="mdi-light:home" /> -->
      <p>Dauer: {{ event.default_duration }} Bewertung: {{ event.rating }}</p>
      <p>Preis: {{ event.default_price.formatted }}</p>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getPrincipalEventImage(event) {
      const principalImage = event.images.find((image) => image.isPrincipal)
      return principalImage ? principalImage.thumb : ''
    },
  },
}
</script>

<style scoped>
.thumb {
  margin: 0 auto;
}
</style>

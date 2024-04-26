<template>
    <div>
      <NuxtLink :to="`/e/${event.permalink}`">
        <img :src="getPrincipalEventImage(event)" alt="event image" />
        <h2>{{ event.title }}</h2>
        <p>{{ event.subtitle }}</p>
        <p>Dauer: {{ event.default_duration }}</p>
        <p>Bewertung: {{ event.rating }}</p>
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
        const principalImage = event.images.find((image) => image.isPrincipal);
        return principalImage ? principalImage.thumb : '';
      },
    },
  };
  </script>
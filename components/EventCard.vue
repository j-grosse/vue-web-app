<template>
  <div class="container">
    <div
      class="text-center word-break-word rounded-lg bg-gray-100 shadow-md mx-auto m-4 p-3 text-xs sm:text-sm xl:text-lg"
    >
      <p data-testid="cypress-city" class="font-bold mb-2">{{ event.city }}</p>
      <NuxtLink :to="`/events/${event.permalink}`">
        <img
          :src="getPrincipalEventImage(event)"
          class="mx-auto rounded-md"
          alt="event image"
        />
        <div data-testid="cypress-title" class="font-medium my-4">
          {{ event.title }}
        </div>
        <div class="text-left mx-2">
          <div class="flex gap-4">
            <div class="flex">
              <IconClock class="mr-2" />
              <p>{{ event.default_duration / 60 }} h</p>
            </div>
            <div class="flex">
              <IconStar class="mr-2" />
              <p class="">{{ event.rating }}</p>
            </div>
          </div>
          <div class="flex">
            <IconEuro class="mr-2" />
            <p>{{ event.default_price.formatted }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import IconStar from '@/components/IconStar.vue'
import IconClock from '@/components/IconClock.vue'
import IconEuro from '@/components/IconEuro.vue'

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

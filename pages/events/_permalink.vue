<template>
  <div class="custom-container">
    <div v-if="event">
      <div class="px-4">
          <NuxtLink class="custom-button" to="/"> zurück </NuxtLink>
        <h1 class="my-4">{{ event.title }}</h1>
        <p class="mb-8">{{ event.subtitle }}</p>

        <!-- Course images  -->
        <div class="grid grid-cols-2 gap-2 md:gap-4 my-4">
          <div>
            <img
              :src="principalImage"
              class="rounded-lg w-full"
              alt="event image"
            />
          </div>
          <div class="grid grid-cols-2 gap-2 md:gap-4">
            <div v-for="image in altImages.slice(0, 4)" :key="image.id">
              <img :src="image.thumb" class="rounded-lg" alt="alt images" />
            </div>
          </div>
        </div>
        <div>
          <ul class="mt-4">
            <h1>Kursbeschreibung</h1>
            <p class="my-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Aspernatur accusamus laboriosam possimus impedit non neque
              exercitationem fugiat atque dolorum, sunt placeat eveniet, sit
              illum omnis quas ea, fuga maiores inventore.
            </p>
            <p class="font-bold">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <ul>
              <li>
                <p class="my-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aspernatur accusamus laboriosam possimus impedit non neque
                  exercitationem fugiat atque dolorum, sunt placeat eveniet, sit
                  illum omnis quas ea, fuga maiores inventore.
                </p>
              </li>
              <p class="font-bold">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <li>
                <p class="my-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aspernatur accusamus laboriosam possimus impedit non neque
                  exercitationem fugiat atque dolorum, sunt placeat eveniet, sit
                  illum omnis quas ea, fuga maiores inventore.
                </p>
              </li>
            </ul>

            <li>Dauer: {{ event.default_duration / 60 }} h</li>
            <li>Rating: {{ event.rating }}</li>
            <li>Preis: {{ event.default_price.formatted }}</li>
            <br />
            <li>Anbieter: {{ event.supplier }}</li>
            <li>Stadt: {{ event.city }}</li>
            <br />
            <li>
              Tags:
              <span v-for="tag in event.tags" :key="tag.slug"
                >{{ tag.name }},
              </span>
            </li>
          </ul>
        </div>
      </div>
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

<template>
  <div>
    <h2 class="text-center mb-4">Top Erlebnisse in Deiner Nähe</h2>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="event in events" :key="event.id">
        <!-- Event card component -->
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const events = ref([])

    onMounted(async () => {
      // import event data
      const eventData = require('@/data/events.json')
      events.value = eventData
    })

    return {
      events,
    }
  },
}
</script>

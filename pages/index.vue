<template>
  <div>
    <h2>Top Erlebnisse in Deiner Nähe</h2>
    <div v-for="event in events" :key="event.id">
      <!-- Event card component -->
      <EventCard :event="event" />
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

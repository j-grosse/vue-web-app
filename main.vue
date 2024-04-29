<!-- main.vue -->
<template>
    <div id="app">
      <NuxtLink to="/">Home</NuxtLink>
      <router-view />
    </div>
  </template>
  
  <script setup>
  import { createApp } from 'vue'
  import IndexPage from '@/pages/index.vue'
  import EventCard from '@/components/EventCard.vue'

  const app = createApp({})
  app.component('IndexPage', IndexPage)
  app.component('EventCard', EventCard)

  </script>


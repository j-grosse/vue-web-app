<template>
  <div id="app">
    <layout-default />
  </div>
</template>

<script setup>
import { createApp } from 'vue'
import LayoutDefault from '@/layouts/default.vue'

const app = createApp(LayoutDefault)
</script>

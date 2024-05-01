<template>
  <div id="app">
    <header class="">
      <nav class="">
        <div class="flex justify-between">
          <img
            class="ml-8 p-4 w-32"
            src="@/assets/images/logo.svg"
            alt="Logo"
          />
          <ul class="flex gap-8 p-4">
            <li><NuxtLink to="/">Konto</NuxtLink></li>
            <li><NuxtLink to="/">Warenkorb</NuxtLink></li>
          </ul>
        </div>
        <ul class="flex text-sm text-gray-500 gap-10 p-4 border-y-2">
          <li class="pl-10"><NuxtLink to="/">Kurse</NuxtLink></li>
          <li><NuxtLink to="/">Gutscheine</NuxtLink></li>
          <li><NuxtLink to="/">Teamevents</NuxtLink></li>
          <li><NuxtLink to="/">Werde Partner</NuxtLink></li>
          <li><NuxtLink to="/">Magazin</NuxtLink></li>
          <li class="btn ml-auto">
              <NuxtLink class="custom-button text-white bg-teal-900" to="/">Teamevent anfragen</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <router-view />

    <footer class="">
      <ul class="flex text-sm text-gray-500 gap-4 p-4 border-y-2">
        <li><NuxtLink to="/">Kurse</NuxtLink></li>
        <li><NuxtLink to="/">Gutscheine</NuxtLink></li>
        <li><NuxtLink to="/">Teamevents</NuxtLink></li>
        <li><NuxtLink to="/">Werde Partner</NuxtLink></li>
        <li><NuxtLink to="/">Magazin</NuxtLink></li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const components = {
  IndexPage: defineAsyncComponent(() => import('@/pages/index.vue')),
}
</script>

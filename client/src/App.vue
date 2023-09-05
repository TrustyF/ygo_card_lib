<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref, provide, computed, inject, onMounted} from "vue";

const curr_api = inject("curr_api");

let is_card_updated = ref(false)
const card_storages = ref([])

provide("card_size", [168, 246]);
provide('is_card_updated', is_card_updated)
provide('card_storages', card_storages)

function load_card_storages() {
  const url = new URL(`${curr_api}/storage/get_all`)
  // url.searchParams.set('none','none')
  fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        card_storages.value = data
      })
}

onMounted(() => {
  load_card_storages()
})

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/cards">Cards</RouterLink>
      <RouterLink to="/scan_card">Card scan</RouterLink>
    </nav>
  </header>
  <RouterView/>

</template>

<style scoped>

</style>

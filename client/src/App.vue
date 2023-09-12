<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref, provide, computed, inject, onMounted} from "vue";
import NavBarMain from "./components/navbar/NavBarMain.vue";

const curr_api = inject("curr_api");

let is_card_updated = ref(false)
let is_card_editing = ref(false)
const card_storages = ref([])

provide("card_size", [168, 246]);
provide('is_card_updated', is_card_updated)
provide('card_storages', card_storages)
provide('is_card_editing', is_card_editing)

function load_card_storages() {
  const url = new URL(`${curr_api}/storage/get_all`)
  // url.searchParams.set('none','none')
  fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        card_storages.value = data
        card_storages.value.push({id: 0, 'name': 'null'})
        console.log(card_storages.value)
      })
}

onMounted(() => {
  load_card_storages()
})

</script>

<template>

  <div class="main_wrapper">
    <nav-bar-main></nav-bar-main>

    <RouterView/>
  </div>

</template>

<style scoped>
.main_wrapper {
  outline: 1px solid red;
  width: 80%;
  margin: auto;
}
</style>

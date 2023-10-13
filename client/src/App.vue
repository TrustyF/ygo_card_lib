<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref, provide, computed, inject, onMounted} from "vue";
import NavBarMain from "./components/navbar/NavBarMain.vue";

const curr_api = inject("curr_api");

let is_card_updated = ref(false)
let is_card_editing = ref(false)
const card_storages = ref([])

let card_scaling = 1.9
provide("card_size", [168/card_scaling, 246/card_scaling]);
provide('is_card_updated', is_card_updated)
provide('card_storages', card_storages)
provide('is_card_editing', is_card_editing)

function load_card_storages() {
  const url = new URL(`${curr_api}/storage/get_all`)
  // url.searchParams.set('none','none')

  fetch(url)
      // Handle http error
      .then(response => {
        if (!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        // console.log(data);
        card_storages.value = data
        card_storages.value.push({id: 0, 'name': 'null'})
        // card_storages.value.sort((a, b) => a['id'] > b['id'])
        console.log(card_storages.value)
      })
}

onMounted(() => {
  load_card_storages()
})

</script>

<template>

  <div class="main_wrapper">
<!--    <nav-bar-main></nav-bar-main>-->

    <RouterView/>
  </div>

</template>

<style scoped>
.main_wrapper {
  /*outline: 1px solid red;*/
  width: 100vw;
  margin: auto;
  overflow: clip;
}
</style>

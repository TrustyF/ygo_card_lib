<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref, provide, computed, inject, onMounted} from "vue";
import NavBarMain from "./components/navbar/NavBarMain.vue";
import PageLoading from "./components/generic/PageLoading.vue";

const curr_api = inject("curr_api");
let card_scaling = 1.9

let is_card_updated = ref(false)
let is_card_editing = ref(false)
const card_storages = ref([])
let load_card_storages_status = ref("none")

provide("card_size", [168 / card_scaling, 246 / card_scaling]);
provide('is_card_updated', is_card_updated)
provide('card_storages', card_storages)
provide('is_card_editing', is_card_editing)

async function load_card_storages() {
  load_card_storages_status.value = "loading"
  const url = new URL(`${curr_api}/storage/get_all`)


  // fetch(url)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       card_storages.value = data
  //       load_card_storages_status.value = "loaded"
  //     })
  //     .catch(error => {
  //       console.log('test failed')
  //     });
}

onMounted(() => {
  load_card_storages()
})

</script>

<template>
  <nav-bar-main></nav-bar-main>
  <div class="main_wrapper">
    <page-loading :status="load_card_storages_status"></page-loading>
    <RouterView/>
  </div>

</template>

<style scoped>
.main_wrapper {
  outline: 1px solid red;
  width: 100vw;
  margin: auto;
  overflow: clip;
}
</style>

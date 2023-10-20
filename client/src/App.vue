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
let server_status = ref("none")

provide("card_size", [168/card_scaling, 246/card_scaling]);
provide('is_card_updated', is_card_updated)
provide('card_storages', card_storages)
provide('is_card_editing', is_card_editing)
provide('server_status', server_status)

function load_card_storages() {
  server_status.value = "loading"
  const url = new URL(`${curr_api}/storage/get_all`)
  let retryLeft = 3

  while (retryLeft > 0){
      fetch(url)

        // Handle http error
        .then(response => {
          if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })

        // Process the returned JSON data
        .then(data => {
          card_storages.value = data
          // card_storages.value.push({id: 0, 'name': 'null'})
          retryLeft = 0
          server_status.value = "loaded"
          console.log(data)
        })

        // Handle any errors that occurred during the fetch
        .catch(error => {
          console.error('Error:', error);
          server_status.value = "failed"
        });
      retryLeft -=1
  }

}

onMounted(() => {
  load_card_storages()
})

</script>

<template>

  <div class="main_wrapper">
    <nav-bar-main></nav-bar-main>
    <page-loading></page-loading>
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

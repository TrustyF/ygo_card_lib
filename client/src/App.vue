<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref, provide, computed, inject, onMounted} from "vue";
import NavBarMain from "./components/navbar/NavBarMain.vue";
import PageLoading from "./components/generic/PageLoading.vue";

const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");
let card_scaling = ref(1.9)
let card_size = computed(() => [168 / card_scaling.value, 246 / card_scaling.value])

let is_card_updated = ref(false)
let is_card_editing = ref(true)
const card_storages = [
  {"name": "Grey_trade_binder", "id": 10},
  {"name": "Red_deck_box", "id": 1},
  {"name": "Black_deck_box", "id": 2},
  {"name": "Large_black_deck_box", "id": 3},
  {"name": "Dark_side_of_dimensions_deck_box", "id": 4},
  {"name": "Yugi_Muto_&_Yami_Yugi_Mega-Tin", "id": 6}
];
let cards_selling = ref([])

provide("card_size", card_size);
provide('is_card_updated', is_card_updated)
provide('card_storages', card_storages)
provide('is_card_editing', is_card_editing)
provide('cards_selling', cards_selling)

function scale_card_to_width() {
  console.log(window.innerWidth)
  if (window.innerWidth < 400) {
    card_scaling.value = 2.5
  }
}

onMounted(() => {
  scale_card_to_width()
})

</script>

<template>
  <nav-bar-main></nav-bar-main>
  <p style="position:absolute;z-index: 100;right: 0" v-if="debug_mode">Using {{curr_api}}</p>
  <div class="main_wrapper">
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

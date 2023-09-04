<script setup>
import {inject, onMounted, watch, ref, computed, provide} from "vue";
import CardMaster from "./CardMaster.vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')
let user_cards = ref([])

let is_card_updated = ref(false)
provide('is_card_updated', is_card_updated)

function get_all_cards() {
  fetch(new URL(`${curr_api}/card/get_all`))
      .then(response => response.json())
      .then(data => {

        // data.sort((a, b) => a.type > b.type)
        user_cards.value = data
        console.log('cards', data);
      })
}

onMounted(() => {
  get_all_cards()
})

watch(is_card_updated, () => {
  get_all_cards()
  is_card_updated.value = false
})
</script>

<template>

  <div class="card_list">
    <div v-for="card in user_cards" :key="card.id">
      <CardMaster :card="card"></CardMaster>
    </div>
  </div>

</template>

<style scoped>
.card_list {
  /*outline: 1px solid red;*/
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(v-bind(card_width), 1fr));
  gap: 10px;
  justify-items: center;
}
</style>
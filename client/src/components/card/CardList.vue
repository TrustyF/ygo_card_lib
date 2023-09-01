<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardMaster from "./CardMaster.vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");

let user_cards = ref([])

function get_all_cards() {
  fetch(new URL(`${curr_api}/card/get_all`))
      .then(response => response.json())
      .then(data => {

        data.sort((a, b) => a.type > b.type)
        user_cards.value = data
        console.log('cards', data);
      })
}

onMounted(() => {
  get_all_cards()
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
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  justify-items: center;
}
</style>
<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardMasterComponent from "../components/card/CardMasterComponent.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");

let user_cards = ref([])

function get_all_cards() {
  fetch(new URL(`${curr_api}/card/get_all`))
      .then(response => response.json())
      .then(data => {
        user_cards.value = data
        console.log('cards',data);
      })
}

onMounted(() => {
  get_all_cards()
})
</script>

<template>
  <div v-for="card in user_cards" :key="card.id">
    <card-master-component :card="card"></card-master-component>
  </div>
</template>

<style scoped>

</style>
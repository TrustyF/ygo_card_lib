<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardMaster from "../components/card/CardMaster.vue";

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);
const curr_api = inject("curr_api");

let card_previews = ref([])

let card_name = ref('')
let card_image = ref()

function find_by_name(text){
  console.log(text)

  const url = new URL(`${curr_api}/card/search_template_by_name`)
  url.searchParams.set('name',text)

  fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        card_previews.value = data
      })
      .catch(error => {
      })
}
</script>

<template>
  <div  class="card_previews">
    <div v-for="card in card_previews" :key="card['card_id']">
      <card-master :card="card"></card-master>
    </div>
  </div>
  <div>
    <img :src="card_image" alt="card_image">
    <input v-model="card_name" placeholder="name" @keydown.enter="find_by_name($event.target.value)">
  </div>
</template>

<style scoped>
.card_previews {
  display: flex;
  flex-flow: row wrap;
}

</style>
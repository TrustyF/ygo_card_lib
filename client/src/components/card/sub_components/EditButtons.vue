<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");

function delete_card(card_id) {
  const url = new URL(`${curr_api}/card/delete`)
  url.searchParams.set('id', String(card_id))
  fetch(url, {
    method: "DELETE"
  })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
}
</script>

<template>
  <div>
    <button @click="delete_card(card.id)" style="position: absolute">x</button>
  </div>
</template>

<style scoped>

</style>
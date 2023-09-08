<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const is_card_editing = inject("is_card_editing");
const is_card_updated = inject("is_card_updated");

function add_search(input) {
  let text = input.target.value
  const url = new URL(`${curr_api}/card/add_by_name`)
  url.searchParams.set('name', text)
  fetch(url)
      .then(data => {
        is_card_updated.value = true
        console.log(data);
      })
}
</script>

<template>
  <div class="wrapper">
    <button @click="is_card_editing=!is_card_editing">edit cards</button>


    <div>
      <label for="add_search" style="margin-right: 5px">Add search</label>
      <input type="search" id="add_search" @keydown.enter="add_search">
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  /*position: fixed;*/
  /*width: 70px;*/
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  z-index: 50;
  margin: 10px;
}
</style>
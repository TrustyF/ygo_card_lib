<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
let emits = defineEmits(["filter"]);
const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");

function highlight_button(elem) {

  let highlighted_buttons = document.getElementsByClassName('button')

  for (let btn of highlighted_buttons) btn.classList.remove('highlight')

  if (elem.target.classList.contains('highlight')) {
    elem.target.classList.remove('highlight')

  } else {
    elem.target.classList.add('highlight')
  }
}

</script>

<template>

  <p>Filters:</p>
  <button class="button highlight" @click="highlight_button($event);emits('filter','price')">Price</button>
  <button class="button" @click="highlight_button($event);emits('filter','staple')">Staple</button>
  <button class="button" @click="highlight_button($event);emits('filter','new')">New</button>
  <button class="button" v-if="debug_mode" @click="highlight_button($event);emits('filter','updated')">updated</button>

</template>

<style scoped>
.button {
  cursor: pointer;
  color: white;
  padding: 5px 7px 5px 7px;
  border: 1px solid;
  border-radius: 8px;
  background: none;
}

.button:hover {
  color: black;
  background: white;
}

.highlight {
  color: black;
  background: white;
}

@media only screen and (max-width: 400px) {

}
</style>
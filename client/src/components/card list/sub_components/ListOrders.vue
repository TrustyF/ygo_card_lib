<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
let emits = defineEmits(["order"]);
const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");

function handle_click(event, emit_val) {

  let button = event.target


  if (!button.classList.contains('highlight')) {

    //clear other buttons
    let other_buttons = document.getElementsByClassName('button_ordering')
    for (let btn of other_buttons) btn.classList.remove('highlight')

    button.classList.add('highlight')
    emits('order', emit_val)
  }
}

</script>

<template>

  <p>Order:</p>
  <button class="button_ordering" @click="handle_click($event,'priority')">Type</button>
  <button class="button_ordering highlight" @click="handle_click($event,'price')">Price</button>
  <button class="button_ordering" @click="handle_click($event,'new')">New</button>
  <button class="button_ordering" v-if="debug_mode" @click="handle_click($event,'updated')">updated</button>

</template>

<style scoped>
.button_ordering {
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
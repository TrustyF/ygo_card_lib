<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
let emits = defineEmits(["filter"]);
const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");

function handle_click(event, emit_val) {

  let button = event.target


  if (button.classList.contains('highlight')) {
    button.classList.remove('highlight')
    emits('filter', '')
  } else {

    //clear other buttons
    let other_buttons = document.getElementsByClassName('button_filters')
    for (let btn of other_buttons) btn.classList.remove('highlight')

    button.classList.add('highlight')
    emits('filter', emit_val)
  }
}

</script>

<template>

  <p>Filters:</p>
  <button class="button_filters" @click="handle_click($event,'staple')">Staple</button>
  <button class="button_filters" @click="handle_click($event,'expensive')">More than $1</button>

</template>

<style scoped>
.button_filters {
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
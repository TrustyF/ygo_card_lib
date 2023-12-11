<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
let emits = defineEmits(["search_text"]);
const curr_api = inject("curr_api");

let search_text = ref('')

function emit_search_text(event) {
  console.log('emit text', search_text.value)
  emits("search_text", search_text.value)
}

</script>

<template>
  <div style="position: relative;display: flex;align-items: center">
    <input placeholder="Search card" ref="search_box_container" @change="search_text=$event.target.value"
           @keydown.enter="search_text=$event.target.value;emit_search_text()"
           @keydown.esc="$event.target.value='';search_text='';emit_search_text()" :value="search_text"
           @click="$event.target.select()">
    <button class="button" @click="emit_search_text()" style="margin-left: 10px">Enter</button>
    <button class="button" @click="search_text='';emit_search_text()" style="margin-left: 5px">Clear</button>
  </div>
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
</style>
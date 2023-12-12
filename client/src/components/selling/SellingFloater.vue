<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

import store_image from '/ui/grocery-store.png'

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);

const curr_api = inject("curr_api");
const cards_selling = inject("cards_selling");

</script>

<template>
  <div class="floater_wrapper">
    <div class="store_button">
      <img :src="store_image" alt="store_img" class="store_image">
    </div>
    <h1 class="amount">{{cards_selling.length}}</h1>
  </div>
</template>

<style scoped>
.floater_wrapper{
  cursor: pointer;
  position: fixed;
  background-color: dimgrey;
  border: solid 3px white;
  border-radius: 50%;
  right: 10px;
  top: 54px;
  width: 50px;
  height: 50px;
  z-index: 10;
}
.store_button{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.store_image {
  width: 50%;
  filter: invert();
}
.amount {
  font-family: Caladea sans-serif;
  font-size: 1.2em;
  position: absolute;
  line-height: 1em;
  left: -10px;
  top: -10px;
  background-color: red;
  padding: 12px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 0 0 1px black, 0 0 2px black, 0 0 4px black, 0 0 2px black;
}
</style>
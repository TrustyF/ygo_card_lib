<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

import store_image from '/ui/grocery-store.png'

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);

const curr_api = inject("curr_api");
const cards_selling = inject("cards_selling");

</script>

<template>
  <div :class="cards_selling.length > 0 ? 'floater_wrapper active' : 'floater_wrapper'">
    <router-link to="/sell_cards" class="store_button">
      <h1 class="amount">{{ cards_selling.length }}</h1>
      <img :src="store_image" alt="store_img" class="store_image">
    </router-link>
  </div>
</template>

<style scoped>
.floater_wrapper {
  cursor: pointer;
  position: fixed;
  background-color: #4b4b4b;
  border: solid 3px white;
  /*border-radius: 50%;*/
  border-radius: 20px 0 0 20px;
  right: -100px;
  top: 54px;
  width: 80px;
  height: 50px;
  z-index: 50;

  transition: 300ms ease-in-out;
}
.active {
  right: -10px;
}

.store_button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
  margin-left: 15px;
}

.store_image {
  height: 50%;
  filter: invert();
}
a {
  text-decoration: none;
}
.amount {
  font-family: Caladea sans-serif;
  font-size: 1.5em;
  /*line-height: 1em;*/
  /*padding: 12px;*/
  /*border-radius: 50%;*/
  /*width: 5px;*/
  /*height: 5px;*/
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  color: white;
  /*text-shadow: 0 0 1px black, 0 0 2px black, 0 0 4px black, 0 0 2px black;*/
}
</style>
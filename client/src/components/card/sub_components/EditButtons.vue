<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);

const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");

const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')

function delete_card(card_id) {
  const url = new URL(`${curr_api}/card/delete`)
  url.searchParams.set('id', String(card_id))
  fetch(url)
      .then(() => {
        is_card_updated.value = true
      })
}

function set_card_code(card_code, card_id) {
  const url = new URL(`${curr_api}/card/set_card_code`)
  url.searchParams.set('id', String(card_id))
  url.searchParams.set('code', String(card_code))
  fetch(url)
      .then(() => {
        is_card_updated.value = true
      })
}
</script>

<template>
  <div class="buttons_wrapper">
    <button @click="delete_card(card.id)">x</button>

    <div class="set_list">
      <div class="set_button" v-for="set in card['sets']" :key="set['card_code']">
        <button @click="set_card_code(set['card_code'],card.id)">{{ set['card_code'] }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buttons_wrapper {
  width: v-bind(card_width);
  height: v-bind(card_height);
  position: absolute;
  /*outline: 1px solid red;*/
  z-index: 10;
  overflow-y: scroll;
  scrollbar-width: none;
}
</style>
<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')

</script>

<template>
  <div class="card_amount badge"> {{ card['amount'] }} </div>
  <div class="card_rarity badge"> {{ card['rarity_code'] }} </div>
</template>

<style scoped>
.card_image {
  width: v-bind(card_width);
  height: v-bind(card_height);
}
.card_amount {
  position: absolute;
  width: 30px;
  height: 30px;
  right: -10px;
  top: -10px;
}
.card_rarity {
  position: absolute;
  width: 30px;
  height: 30px;
  right: -10px;
  top: 30px;
}
.badge {
  color: white;
  font-size: 1.1em;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: royalblue;
  box-shadow: inset 1px 1px white;
  filter: drop-shadow(1px 1px 1px black);
}
</style>
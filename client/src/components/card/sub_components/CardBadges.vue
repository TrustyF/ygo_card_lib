<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')

</script>

<template>
  <div class="wrapper" v-if="card['card_id']!==null">
    <div class="badge" v-if="card['amount']>1"> {{ card['amount'] }}</div>
  </div>
</template>

<style scoped>
.card_image {
  width: v-bind(card_width);
  height: v-bind(card_height);
}
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  right: -10px;
  top: -10px;
  gap: 5px;
}
.badge {
  width: 25px;
  height: 25px;

  color: white;
  font-size: 1em;
  font-weight: bold;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: darkcyan;
  /*box-shadow: inset 1px 1px white;*/
  filter: drop-shadow(2px 2px 2px black);
}
</style>
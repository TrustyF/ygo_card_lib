<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')

</script>

<template>
  <div class="footer" v-if="card['card_id']!==null">
    <h1>{{ card['name'] }}</h1>


    <div id="code_and_price">
      <h2>{{ card['code'] }}</h2>
      <h2> - </h2>
      <h2>{{ card['rarity'] }}</h2>
    </div>

    <h3 v-if="card['sell_price']">{{ card['sell_price'] + "$" }}</h3>
    <h3 v-else>{{ card['price'] + "$" }}</h3>

  </div>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: 5px;
  width: v-bind(card_width);
  /*outline: 1px solid red;*/
}

#code_and_price {
  /*outline: 1px solid greenyellow;*/

  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
}

h1 {
  font-size: 1.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h2 {
  font-size: 0.8em;
}

h3 {
  font-size: 1em;
  font-weight: bold;

}
</style>
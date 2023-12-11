<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");
const card_size = inject("card_size");
const cards_selling = inject("cards_selling");

const card_width = computed(() => String(card_size.value[0]) + 'px')

function parse_price(price) {
  //convert to cad and round
  return Math.round((parseFloat(price) * 1.36) * 100) / 100
}

function add_card_to_selling() {
  let temp_card = computed(() => JSON.parse(JSON.stringify(props['card'])))
  temp_card.value['amount'] = 1

  //check presence
  if (cards_selling.value.map((x) => x['card_id']).includes(temp_card.value['card_id'])) {
    console.log('dupe found, not adding')
  } else {
    cards_selling.value.push(temp_card.value)
    console.log(cards_selling.value)
  }
}
</script>

<template>
  <div class="footer" v-if="card['card_id']!==null" @click="add_card_to_selling()">
    <h1>{{ card['name'] }}</h1>

    <h2>{{ card['code'] }}</h2>
    <h2>{{ card['rarity'] }}</h2>

    <div class="code_and_rarity">
      <h3 v-if="card['price']">{{ "$" + parse_price(card['price']) }}</h3>
    </div>

    <div v-if="debug_mode">
      <h1 style="font-size: 0.5em">{{ card['updated_at'] }}</h1>
      <img alt="storage_image" :src="`/images_storage/${card['storage_name']}_thumbnail.png`"
           style="width: 30px;margin: -10px">
      <h1 style="font-size: 0.5em">{{ card['archetype'] === null ? 'none' : card['archetype'] }}</h1>
    </div>
  </div>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: 5px;
  width: v-bind(card_width);
  cursor: pointer;
  /*outline: 1px solid red;*/
}

.code_and_rarity {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
  /*outline: 1px solid red;*/
}

h1 {
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h2 {
  font-size: 0.7em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h3 {
  font-size: 1em;
  font-weight: bold;
}

@media only screen and (max-width: 400px) {
  h1 {
    font-size: 0.5em;
  }

  h2 {
    font-size: 0.4em;
  }

  h3 {
    font-size: 0.5em;
  }
}
</style>
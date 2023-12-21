<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card","size_multiplier"]);
const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");
const card_size = inject("card_size");

const card_width = computed(() => String(card_size.value[0] * props['size_multiplier']) + 'px')
const card_height = computed(() => String(card_size.value[1] * props['size_multiplier']) + 'px')

function parse_price(price) {
  //convert to cad and round
  return Math.round((parseFloat(price) * 1.36) * 100) / 100
}

</script>

<template>
  <div class="footer" v-if="card['card_id']!==null">
    <h1 :title="card['name']">{{ card['name'] }}</h1>

    <h2 :title="`${card['code']} - ${card['rarity']}`">{{ `${card['code']} - ${card['rarity']}` }}</h2>
<!--    <h2 :title="card['rarity']">{{ card['rarity'] }}</h2>-->

    <div class="price">
      <h3 v-if="card['price']">{{ "$" + parse_price(card['price']) }}</h3>
<!--      <h3 v-if="card['price'] && debug_mode" style="font-size: 0.6em">{{ (card['price']) }}</h3>-->
    </div>

    <img v-if="card['storage_name']" class="storage_image"
         :src="`/images_storage/${card['storage_name']}_thumbnail.png`" alt="storage">

    <div v-if="debug_mode">
<!--      <h1 style="font-size: 0.5em">{{ card['updated_at'] }}</h1>-->
<!--      <img alt="storage_image" :src="`/images_storage/${card['storage_name']}_thumbnail.png`"-->
<!--           style="width: 30px;margin: -10px">-->
<!--      <h1 style="font-size: 0.5em">{{ card['archetype'] === null ? 'none' : card['archetype'] }}</h1>-->
    </div>
  </div>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: 5px;
  width: v-bind(card_width);
  /*outline: 1px solid red;*/
}

.price {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  /*margin-top: 3px;*/
  /*gap: 10px;*/
  /*outline: 1px solid red;*/
}

h1 {
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h2 {
  font-size: 0.6em;
  white-space: nowrap;
  color: #5b5b5b;
  overflow: hidden;
  /*font-weight: bold;*/
  text-overflow: ellipsis;
  margin-top: -3px;
}

h3 {
  font-size: 1em;
  font-weight: bold;
}

.storage_image {
  opacity: 25%;
  position: absolute;
  max-height: 30px;
  margin: -5px;
  bottom: 0;
  right: 0;
}

@media only screen and (max-width: 400px) {
  h1 {
    font-size: 0.8em;
  }

  h2 {
    font-size: 0.6em;
  }

  h3 {
    font-size: 0.7em;
  }
}
</style>
<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");
const card_size = inject("card_size");

const card_width = computed(() => String(card_size.value[0]) + 'px')

</script>

<template>
  <div class="footer" v-if="card['card_id']!==null">
    <h1>{{ card['name'] }}</h1>

    <h2>{{ card['code'] }}</h2>
    <h2>{{ card['rarity'] }}</h2>

    <div class="code_and_rarity">
      <h3 v-if="card['sell_price']">{{ card['sell_price'] + "$" }}</h3>
      <h3 v-else>{{ card['price'] + "$" }}</h3>
    </div>

    <div v-if="debug_mode">
      <h1 style="font-size: 0.5em">{{ card['updated_at'] }}</h1>
      <img alt="storage_image" :src="`/images_storage/${card['storage_name']}_thumbnail.png`" style="width: 30px;margin: -10px">
      <h1 style="font-size: 0.5em">{{ card['archetype'] === null ? 'none' : card['archetype'] }}</h1>
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
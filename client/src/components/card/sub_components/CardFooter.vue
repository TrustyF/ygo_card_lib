<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_storages = inject("card_storages");

const card_width = computed(() => String(card_size[0]) + 'px')

</script>

<template>
  <div class="footer" v-if="card['card_id']!==null">
    <h1>{{ card['name'] }}</h1>


    <div class="code_and_rarity">
      <h2>{{ card['code'] }}</h2>
<!--      <h2 v-if="card['rarity'] !== 'Common'">{{ `${card['rarity']}` }}</h2>-->
<!--      <h2 v-if="card['language']">{{ `- ${card['language']}` }}</h2>-->
      <h3 v-if="card['sell_price']">{{ card['sell_price'] + "$" }}</h3>
      <h3 v-else>{{ card['price'] + "$" }}</h3>
    </div>

    <div class="storage" v-if="card['storage_name']!==null">
      <img :src="`${curr_api}/storage/get_image?id=${card['storage_id']}`" class="storage_image">
      <h2>{{ card['storage_name'].replace(/_/g, ' ') }}</h2>
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

.storage {
  /*outline: 1px solid red;*/
  display: flex;
  flex-flow: row nowrap;
  width: v-bind(card_width);
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}

.storage_image {
  /*position: absolute;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*width: 30px;*/
  height: 30px;
  /*opacity: 50%;*/
}

h1 {
  font-size: 1.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h2 {
  font-size: 0.7em;
}

h3 {
  font-size: 1em;
  font-weight: bold;
}
</style>
<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");

const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')

const visible = ref(false)

</script>

<template>
  <div class="hit_box" @click="visible = !visible"></div>
  <div :class="visible ? 'storage visible' : 'storage'" v-if="card['storage_name']!==null">
    <img :src="`${curr_api}/storage/get_image?id=${card['storage_id']}`" class="storage_image">
    <h1>{{ card['storage_name'].replace(/_/g, ' ') }}</h1>
  </div>
</template>

<style scoped>
.hit_box {
  position: absolute;
  /*outline: 1px solid red;*/
  width: v-bind(card_width);
  height: v-bind(card_height);
  z-index: 20;

  cursor: pointer;
}

.storage {
  position: absolute;
  width: v-bind(card_width);
  height: v-bind(card_height);
  z-index: 10;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.75);

  opacity: 0;
  visibility: hidden;

  transition: 100ms all;
}

.visible {
  opacity: 100;
  visibility: visible;
}

h1 {
  font-size: 0.7em;
  text-align: center;
  /*font-weight: bold;*/
  color: white;
  /*white-space: normal;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
}

.storage_image {
  /*position: absolute;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*width: 30px;*/
  height: 50px;
  /*opacity: 50%;*/
}
</style>
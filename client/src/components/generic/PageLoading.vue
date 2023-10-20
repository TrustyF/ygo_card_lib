<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const server_status = inject("server_status");

import scapegoats_loader from "/src/assets/loaders/scapegoats_floating.gif"
import spinner_loader from "/src/assets/loaders/482.svg"

</script>

<template>
  <div v-if="server_status==='loading'"
       style="display: flex;left: auto;top:0;position: absolute;height: 50%;width: 90%;align-items: center;justify-content: center;">
    <img :src="spinner_loader"
         style="width: 120px;height: 120px;position:absolute;">
    <img :src="scapegoats_loader"
         style="width: 150px;height: 150px;position:absolute;">
  </div>

  <div v-if="server_status==='failed'"
       style="display: flex;left: auto;top:auto;position: absolute;height: 50%;width: 90%;align-items: center;justify-content: center;margin-top: 10px">
    <img src="/src/assets/loaders/failed_load.png"
         style="height: 100%;position:absolute;">
  </div>
</template>

<style scoped>

</style>
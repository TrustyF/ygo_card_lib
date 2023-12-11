<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["status"]);
const curr_api = inject("curr_api");

import spinner_loader from "/ui/Loading_icon.gif"
import failed_loader from "/ui/connecterror.png"

</script>

<template>
  <div class="page_loader_wrapper">

    <div v-if="status==='loading'" class="container">
      <img :src="spinner_loader" alt="loader" style="width: 15px;height: 15px">
    </div>

    <div v-if="status==='failed'" class="container">
      <img :src="failed_loader" alt="failed_loading" style="width: 70px;height: 70px;filter: invert()">
    </div>

  </div>
</template>

<style scoped>
.page_loader_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  margin: 50px;
  display: flex;
  flex-flow: column wrap;
  left: auto;
}
</style>
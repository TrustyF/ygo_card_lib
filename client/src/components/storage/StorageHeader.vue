<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["storage"]);
const curr_api = inject("curr_api");

</script>

<template>
  <div class="wrapper">
    <img class="storage_image" :src="`${curr_api}/storage/get_image?id=${storage['id']}`">
    <h1 class="storage_name">{{ storage['name'].replace(/_/g, ' ') }}</h1>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
  background-color: #2c3e50;
  padding: 5px;
}
.storage_image {
  height: 30px
}
.storage_name {
  font-size: 1em;
}

</style>
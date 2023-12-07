<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import StorageHeader from "./StorageHeader.vue";
import CardList from "./CardList.vue";

let props = defineProps(["storage"]);
const curr_api = inject("curr_api");

let collapsed = ref(false)
</script>

<template>
  <storage-header :storage="storage" @collapsed="collapsed = !collapsed"></storage-header>
  <card-list card_limit="50" :storage="storage" v-if="collapsed===false"></card-list>
</template>

<style scoped>

</style>
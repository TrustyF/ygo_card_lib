<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardList from "../components/card/CardList.vue";
import StorageHeader from "../components/storage/StorageHeader.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const card_storages = inject("card_storages");

</script>

<template>
  <div v-for="storage in card_storages" :key="storage['id']">

    <StorageHeader :storage="storage"></StorageHeader>
    <card-list card_limit="50" :storage="storage"></card-list>

  </div>


  <!--  <card-list card_limit="50" card_order="new_first"></card-list>-->
  <!--  <card-list card_limit="100"></card-list>-->
</template>

<style scoped>

</style>
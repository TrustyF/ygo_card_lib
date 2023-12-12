<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardListMaster from "../components/card list/CardListStorageHeader.vue";
import SellingFloater from "../components/selling/SellingFloater.vue";


// let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const card_storages = inject("card_storages");

</script>

<template>
  <div v-for="storage in card_storages" :key="storage">
    <selling-floater></selling-floater>
    <card-list-master :storage="storage"></card-list-master>
  </div>
</template>

<style scoped>

</style>
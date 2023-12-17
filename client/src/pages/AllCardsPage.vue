<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardList from "../components/card list/CardList.vue";
import StorageHeader from "../components/card list/sub_components/StorageHeader.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const card_storages = inject("card_storages");

</script>

<template>
  <card-list card_limit="50"></card-list>
</template>

<style scoped>

</style>
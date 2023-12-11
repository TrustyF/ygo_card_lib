<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import SellingMaster from "../components/selling/SellingMaster.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const card_storages = inject("card_storages");

</script>

<template>
  <selling-master></selling-master>
</template>

<style scoped>

</style>
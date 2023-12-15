<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import TradingMaster from "../components/trading/TradingMaster.vue";

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);
const curr_api = inject("curr_api");

</script>

<template>
  <trading-master></trading-master>
</template>

<style scoped>

</style>
<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardList from "../components/card/CardList.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");


</script>

<template>
<card-list></card-list>
</template>

<style scoped>

</style>
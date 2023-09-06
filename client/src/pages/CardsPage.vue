<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardList from "../components/card/CardList.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");

</script>

<template>
  <div class="card_list">
    <card-list card_limit="100"></card-list>
  </div>
</template>

<style scoped>
.card_list {
  margin: auto;
  width: 80%;
}
</style>
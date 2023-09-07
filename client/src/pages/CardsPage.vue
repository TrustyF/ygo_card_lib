<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardList from "../components/card/CardList.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");

</script>

<template>
  <div class="card_list">
    <card-list card_limit="80"></card-list>
  </div>
</template>

<style scoped>
.card_list {
  margin: auto auto 100px auto;
  width: 75%;
}
</style>
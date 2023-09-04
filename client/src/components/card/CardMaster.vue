<script setup>
import {computed, inject} from "vue";
import EditButtons from "./sub_components/EditButtons.vue";
import CardImage from "./sub_components/CardImage.vue";
import CardFooter from "./sub_components/CardFooter.vue";
import CardBadges from "./sub_components/CardBadges.vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const edit_mode = inject("edit_mode");

const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')


</script>

<template>
  <div class="card">
    <edit-buttons :card="card" v-if="edit_mode"></edit-buttons>

    <card-image :card="card"></card-image>
    <card-badges :card="card"></card-badges>
    <card-footer :card="card"></card-footer>

  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: v-bind(card_width);
  height: v-bind(card_height);
  outline: 2px solid purple;
}
</style>
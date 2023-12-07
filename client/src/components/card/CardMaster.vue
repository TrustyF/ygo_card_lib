<script setup>
import {computed, inject} from "vue";
import EditButtons from "./sub_components/EditButtons.vue";
import CardImage from "./sub_components/CardImage.vue";
import CardFooter from "./sub_components/CardFooter.vue";
import CardBadges from "./sub_components/CardBadges.vue";
import CardStorage from "./sub_components/CardStorage.vue";

let props = defineProps(["card"]);

const curr_api = inject("curr_api");
const edit_mode = inject("edit_mode");
const is_card_editing = inject("is_card_editing");

const card_size = inject("card_size");
const card_width = computed(() => String(card_size.value[0]) + 'px')
const card_height = computed(() => String(card_size.value[1]) + 'px')

</script>

<template>

  <div class="card">
    <edit-buttons :card="card" v-if="is_card_editing"></edit-buttons>

    <div class="card_body">
      <card-storage :card="card"></card-storage>
      <card-image :card="card"></card-image>
      <card-badges :card="card"></card-badges>
    </div>

    <card-footer :card="card"></card-footer>
  </div>

</template>

<style scoped>
.card {
  /*outline: 1px solid red;*/
  margin: 5px;
}
.card_body {
  position: relative;
  width: v-bind(card_width);
  height: v-bind(card_height);
}
</style>
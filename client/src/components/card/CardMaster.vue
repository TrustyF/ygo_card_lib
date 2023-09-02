<script setup>
import {inject} from "vue";
import Edit_buttons from "./sub_components/EditButtons.vue";
import Card_image from "./sub_components/CardImage.vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");


</script>

<template>
  <div>
    <edit_buttons :card="card"></edit_buttons>
    <card_image :card="card"></card_image>

  </div>
</template>


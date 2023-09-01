<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import Edit_buttons from "./sub_components/EditButtons.vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");


</script>

<template>
  <div>
    <edit_buttons :card="card"></edit_buttons>

    <img :src="`${curr_api}/card/get_image?id=${card['card_id']}.jpg`" alt="card image">
  </div>
</template>

<style scoped>

</style>
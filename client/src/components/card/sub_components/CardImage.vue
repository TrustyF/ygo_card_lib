<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')

</script>

<template>
  <img :src="`${curr_api}/card/get_image?id=${card['card_id']}.jpg`" alt="card image" class="card_image">
</template>

<style scoped>
.card_image {
  width: v-bind(card_width);
  height: v-bind(card_height);
}
</style>
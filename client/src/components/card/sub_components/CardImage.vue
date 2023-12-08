<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_width = computed(() => String(card_size.value[0]) + 'px')
const card_height = computed(() => String(card_size.value[1]) + 'px')

</script>

<template>
  <img v-lazy="`${curr_api}/card/get_image?id=${card['konami_id']}`" alt="card image" class="card_image">
</template>

<style scoped>
.card_image {
  position: absolute;
  width: v-bind(card_width);
  height: v-bind(card_height);
}
</style>
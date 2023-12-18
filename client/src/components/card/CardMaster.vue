<script setup>
import {computed, inject} from "vue";
import EditButtons from "./sub_components/EditButtons.vue";
import CardImage from "./sub_components/CardImage.vue";
import CardFooter from "./sub_components/CardFooter.vue";
import CardBadges from "./sub_components/CardBadges.vue";
import CardStorage from "./sub_components/CardStorage.vue";

let props = defineProps(["card", "size_multiplier"]);
let emits = defineEmits(["card"]);

const curr_api = inject("curr_api");
const is_card_editing = inject("is_card_editing");
const debug_mode = inject("debug_mode");

const card_size = inject("card_size");
const card_size_multiplier = computed(() => {
  if (props['size_multiplier']) return props['size_multiplier']
  else return 1
})
const card_width = computed(() => String(card_size.value[0] * card_size_multiplier.value) + 'px')
const card_height = computed(() => String(card_size.value[1] * card_size_multiplier.value) + 'px')

// const card_data = computed(() => props['card'])

function emit_card() {
  // console.log('emiting', card_data.value)
  // emits('card', card_data.value)
}

</script>

<template>
  <div class="card" @click="emit_card">
    <edit-buttons :card="card" v-if="is_card_editing && debug_mode"></edit-buttons>

    <div class="card_body">
      <!--      <card-storage v-if="!debug_mode" :card="card"></card-storage>-->
      <card-image :card="card" :size_multiplier="card_size_multiplier"></card-image>
      <card-badges :card="card" :size_multiplier="card_size_multiplier"></card-badges>
    </div>
    <card-footer :card="card" :size_multiplier="card_size_multiplier"></card-footer>
  </div>

</template>

<style scoped>
.card {
  /*outline: 1px solid red;*/
  /*margin-bottom: 10px;*/
}

.card_body {
  position: relative;
  width: v-bind(card_width);
  height: v-bind(card_height);
}
</style>
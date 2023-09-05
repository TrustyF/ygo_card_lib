<script setup>
import {inject, onMounted, watch, ref, computed, provide} from "vue";
import CardMaster from "./CardMaster.vue";

let props = defineProps(["card_limit"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");
const card_width = computed(() => String(card_size[0]) + 'px')
let user_cards = ref([])

function group_same_cards(array) {
  let out = []
  array.forEach((card) => {
    let result = array.filter((value) => value['card_id'] === card['card_id'] && value['storage_id'] === card['storage_id'] && value['language'] === card['language'])
    let existing = out.filter((value) => value['card_id'] === card['card_id'] && value['storage_id'] === card['storage_id'] && value['language'] === card['language'])

    if (result.length > 1 && existing.length === 0) {
      card['amount'] = result.length
      out.push(card)
    } else if (result.length === 1) {
      out.push(card)
    }
  })
  return out
}

function get_all_cards() {
  const url = new URL(`${curr_api}/card/get_all`)

  if (props['card_limit'] !== undefined) {
    url.searchParams.set('card_limit', String(props['card_limit']))
  }

  fetch(url)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => a['user_card_id'] < b['user_card_id'])

        // user_cards.value = group_same_cards(data)
        user_cards.value = data
        console.log('cards', data);
      })
}

onMounted(() => {
  get_all_cards()
})

watch(is_card_updated, () => {
  get_all_cards()
  is_card_updated.value = false
})
</script>

<template>

  <div class="card_list">
    <div v-for="card in user_cards" :key="card['user_card_id']">
      <CardMaster :card="card"></CardMaster>
    </div>
  </div>

</template>

<style scoped>
.card_list {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(v-bind(card_width), 1fr));
  gap: 10px;
  justify-items: center;
}
</style>
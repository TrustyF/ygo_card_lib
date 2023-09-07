<script setup>
import {inject, onMounted, watch, ref, computed, provide} from "vue";
import CardMaster from "./CardMaster.vue";

let props = defineProps(["card_limit", "card_order"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");
const card_width = computed(() => String(card_size[0]) + 'px')
let user_cards = ref([])
let page = ref(0)
let search_text = ref('')

function group_same_cards(array) {
  let out = []
  array.forEach((card) => {

    if (card['card_id'] === null) {
      out.push(card)
      return
    }

    let result = array.filter((value) =>
        value['card_id'] === card['card_id'] &&
        value['storage_id'] === card['storage_id'] &&
        value['language'] === card['language'] &&
        value['card_damage'] === card['card_damage']
    )
    let existing = out.filter((value) =>
        value['card_id'] === card['card_id'] &&
        value['storage_id'] === card['storage_id'] &&
        value['language'] === card['language'] &&
        value['card_damage'] === card['card_damage']
    )

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
  search_text.value = ''

  const url = new URL(`${curr_api}/card/get_all`)

  if (props['card_limit'] !== undefined) {
    url.searchParams.set('card_limit', String(props['card_limit']))
  }

  url.searchParams.set('page', String(page.value))
  url.searchParams.set('ordering', String(props['card_order']))

  fetch(url)
      .then(response => response.json())
      .then(data => {
        // data.sort((a, b) => a['price'] < b['price'])

        user_cards.value = group_same_cards(data)
        // user_cards.value = data
        console.log('cards', data);
      })
}

function change_page(val) {

  page.value = Math.min(Math.max(page.value + val, 0), 200)


  get_all_cards()
  window.scrollTo(0, 0);
}

function search_card() {
  const url = new URL(`${curr_api}/card/search_by_name`)
  url.searchParams.set('name', search_text.value)
  fetch(url)
      .then(response => response.json())
      .then(data => {
        user_cards.value = data
        console.log(data);
      })
}

onMounted(() => {
  get_all_cards()
})

watch(is_card_updated, () => {
  if (search_text.value === '') {
    get_all_cards()
  } else {
    search_card(search_text.value)
  }
  is_card_updated.value = false
})
</script>

<template>
  <div class="wrapper">

    <div class="search_bar_wrapper">
      <input type="text" v-model="search_text" @keydown.enter="search_card" @keydown.esc="get_all_cards"
             @focus="$event.target.select()">
    </div>

    <div class="card_list">
      <div v-for="card in user_cards" :key="card['user_card_id']">
        <CardMaster :card="card"></CardMaster>
      </div>
    </div>

    <div class="page_nav_wrapper">
      <button class="page_nav_button" @click="change_page(-100)">{{ '<<' }}</button>
      <button class="page_nav_button" @click="change_page(-1)">{{ '<' }}</button>
      <button class="page_nav_button" @click="change_page(1)">{{ '>' }}</button>
      <button class="page_nav_button" @click="change_page(1)">{{ '>>' }}</button>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  /*outline: 1px solid red;*/
}

.card_list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(v-bind(card_width), 1fr));
  gap: 20px;
  justify-items: center;
}

.page_nav_wrapper {
  display: flex;
  justify-content: space-between;
}

.page_nav_button {
  width: 40px;
  height: 40px;
}

</style>
<script setup>
import {computed, inject, onMounted, ref, watch} from "vue";
import CardMaster from "../card/CardMaster.vue";
import PageLoading from "../../components/generic/PageLoading.vue";
import ListSearch from "./sub_components/ListSearch.vue";
import ListFilters from "./sub_components/ListFilters.vue";
import {request_card_by_name, request_cards} from "../requests.js"

let props = defineProps(["card_limit", "card_order", "storage"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");
const is_card_editing = inject("is_card_editing");
const card_width = computed(() => String(card_size.value[0]) + 'px')
const card_order = ref(String(props['card_order']))
const card_limit = ref(String(props['card_limit']))
const card_storage = computed(() => String(props['storage']['id']))
let user_cards = ref([])
let page = ref(0)
let pageFullLoaded = ref(false)
let get_all_cards_status = ref("loading")
let card_list_container = ref()
let search_box_container = ref(null)
let search_text = ref('')

let pageLoading = ref(false)

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

// override user cards with requested cards
function get_cards() {
  console.log('getting cards')
  request_cards({limit: card_limit, order: card_order, page: page, storage: card_storage})
      .then(result => {
        console.log(result)
        user_cards.value = group_same_cards(result)
        console.log(user_cards.value)

        if (result.length < 1) pageFullLoaded.value = true
        pageLoading.value = false
        get_all_cards_status.value = "loaded"
      })
}

// add requested cards to list of cards
function concat_cards() {
  request_cards({limit: card_limit, order: card_order, page: page, storage: card_storage})
      .then(result => {
        let newData
        newData = user_cards.value.concat(result)
        user_cards.value = group_same_cards(newData)

        if (result.length < 1) pageFullLoaded.value = true
        pageLoading.value = false
        get_all_cards_status.value = "loaded"
      })
}

function apply_filter(filter) {
  card_order.value = filter
  reload_cards()
}

function reload_cards() {
  // get_all_cards_status.value = "loading"
  page.value = 0
  card_limit.value = '50'
  pageFullLoaded.value = false
  get_cards()
}

function refresh_cards() {
  // get_all_cards_status.value = "loading"
  card_limit.value = String(400)
  page.value = 0
  pageFullLoaded.value = false
  get_cards()
}

function search_card(text) {
  search_text.value = text
  console.log(search_text.value)
  if (search_text.value === "" || search_text.value === undefined) {
    reload_cards()
    return null
  }

  request_card_by_name({name:search_text.value,storage: card_storage})
      .then(data => user_cards.value = data
      )
}

const handleInfiniteScroll = () => {
  let container = card_list_container.value
  if (container === null) return;

  if (search_text.value !== '') return;

  let container_bot = container.getBoundingClientRect()

  const endOfPage = (window.innerHeight + 400) >= container_bot.bottom;

  if (endOfPage && !pageLoading.value && !pageFullLoaded.value) {
    pageLoading.value = true
    page.value += 1
    console.log('loading more')
    concat_cards()
  }

};

onMounted(() => {
  get_cards()
  new ResizeObserver(handleInfiniteScroll).observe(card_list_container.value)
  window.addEventListener("scroll", handleInfiniteScroll);
})

watch(is_card_updated, (newV, oldV) => {
  console.log('card updated', newV, oldV)
  if (newV === true) {
    refresh_cards()
    is_card_updated.value = false
  }
})

</script>

<template>

  <page-loading :status="get_all_cards_status"></page-loading>
  <div class="card_list_wrapper" ref="card_list_container">

    <div class="filters">
      <list-search @search_text="(s) => search_card(s)"/>
      <list-filters @filter="(f) => apply_filter(f)"/>
    </div>

    <div class="card_list">
      <div v-for="card in user_cards" :key="card['user_card_id']">
        <CardMaster :card="card"></CardMaster>
      </div>
    </div>

  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  padding-bottom: 10px;
}

.card_list_wrapper {
  width: 90%;
  margin: 10px auto 10px auto;
  /*outline: 1px solid red;*/

  display: flex;
  flex-flow: column wrap;
}

.card_list {
  /*outline: 1px solid green;*/

  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(v-bind(card_width), 1fr));
  /*grid-template-columns: repeat(20, 1fr);*/
  gap: 10px;
  /*margin-top: 10px;*/
  justify-items: center;
}

@media only screen and (max-width: 400px) {
  .card_list_wrapper {
    width: 95%;
  }

  .card_list {
    gap: 3px;
  }
}

</style>
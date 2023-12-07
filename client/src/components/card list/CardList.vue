<script setup>
import {inject, onMounted, watch, ref, computed, provide} from "vue";
import CardMaster from "../card/CardMaster.vue";
import EditTools from "../editing/EditTools.vue";
import PageLoading from "@/components/generic/PageLoading.vue";
import thin_cross from '/src/assets/ui/thin_x_button.png'
import arrow_left from '/src/assets/ui/arrow_left_single_white.png'

let props = defineProps(["card_limit", "card_order", "storage"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");
const is_card_editing = inject("is_card_editing");
const card_width = computed(() => String(card_size.value[0]) + 'px')
const card_order = ref(String(props['card_order']))
const card_limit = ref(String(props['card_limit']))
let user_cards = ref([])
let page = ref(0)
let pageFullLoaded = ref(false)
let search_text = ref('')
let get_all_cards_status = ref("loading")
let card_list_container = ref()
let search_box_container = ref(null)

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

function get_all_cards(operation) {
  // console.log(props['storage']['name'] + ' is getting cards')
  search_text.value = ''

  const url = new URL(`${curr_api}/card/get_all`)

  url.searchParams.set('card_limit', String(card_limit.value))
  url.searchParams.set('card_page', String(page.value))
  url.searchParams.set('ordering', String(card_order.value))
  url.searchParams.set('storage', props['storage'] !== undefined ? String(props['storage']['id']) : 'undefined')

  fetch(url)
      .then(response => response.json())
      .then(data => {
        let newData

        if (operation === 'clean') {
          newData = data
        } else {
          newData = user_cards.value.concat(data)
        }

        user_cards.value = group_same_cards(newData)

        if (data.length < 1) pageFullLoaded.value = true
        pageLoading.value = false
        get_all_cards_status.value = "loaded"

        handleInfiniteScroll()
      })
      .catch(error => {
        get_all_cards_status.value = "failed"
      });

}

function reload_cards() {
  // get_all_cards_status.value = "loading"
  page.value = 0
  card_limit.value = '100'
  pageFullLoaded.value = false
  get_all_cards('clean')
}

function search_card() {
  console.log(search_text.value)
  if (search_text.value === "" || search_text.value === undefined) return

  const url = new URL(`${curr_api}/card/search_by_name`)
  url.searchParams.set('name', search_text.value)
  fetch(url)
      .then(response => response.json())
      .then(data => {

        user_cards.value = group_same_cards(data)
      })
}

function reset_card_search() {
  page.value = 0
  get_all_cards()
}

const handleInfiniteScroll = () => {
  let container = card_list_container.value
  if (container === null) return;

  let container_bot = container.getBoundingClientRect()

  const endOfPage = (window.innerHeight + 400) >= container_bot.bottom;

  if (search_text.value.length > 0) {
    return
  }

  if (endOfPage && !pageLoading.value && !pageFullLoaded.value) {
    pageLoading.value = true
    page.value += 1
    get_all_cards()
  }

};

function highlight_button(elem) {

  let highlighted_buttons = document.getElementsByClassName('button')

  for (let btn of highlighted_buttons) btn.classList.remove('highlight')

  if (elem.target.classList.contains('highlight')) {
    elem.target.classList.remove('highlight')

  } else {
    elem.target.classList.add('highlight')
  }
}


onMounted(() => {
  get_all_cards()
  window.addEventListener("scroll", handleInfiniteScroll);
})

// watch(is_card_updated, () => {
//   if (search_text.value === '') {
//     get_all_cards()
//   } else {
//     search_card(search_text.value)
//   }
//   is_card_updated.value = false
// })
</script>

<template>

  <page-loading :status="get_all_cards_status"></page-loading>
  <div class="card_list_wrapper" ref="card_list_container">
    <div class="filters">

      <div style="position: relative;display: flex;align-items: center">
        <input placeholder="Search card" ref="search_box_container" @change="search_text=$event.target.value"
               @keydown.enter="search_text=$event.target.value;search_card()"
               @keydown.esc="$event.target.value='';get_all_cards('clean')" :value="search_text">
        <button class="button" @click="search_card()" style="margin-left: 10px">Enter</button>
        <button class="button" @click="search_text='';get_all_cards('clean')" style="margin-left: 5px">Clear</button>
      </div>

      <p>Filters:</p>
      <button class="button highlight" @click="highlight_button($event);card_order='none';reload_cards()">Price</button>
      <button class="button" @click="highlight_button($event);card_order='card_type';reload_cards()">Type</button>
      <button class="button" @click="highlight_button($event);card_order='card_archetype';reload_cards()">Archetype
      </button>
      <button class="button" @click="highlight_button($event);card_order='new_first';reload_cards()">New</button>
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

.button {
  cursor: pointer;
  color: white;
  padding: 5px 7px 5px 7px;
  border: 1px solid;
  border-radius: 8px;
  background: none;
}

.button:hover {
  color: black;
  background: white;
}

.highlight {
  color: black;
  background: white;
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
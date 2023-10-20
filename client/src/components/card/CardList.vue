<script setup>
import {inject, onMounted, watch, ref, computed, provide} from "vue";
import CardMaster from "./CardMaster.vue";
import EditTools from "../editing/EditTools.vue";


let props = defineProps(["card_limit", "card_order","storage"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");
const is_card_editing = inject("is_card_editing");
const card_width = computed(() => String(card_size[0]) + 'px')
let user_cards = ref([])
let page = ref(0)
let pageFullLoaded = ref(false)
let search_text = ref('')

let pageLoading = ref(false)

const debug = computed(() => {
  return [window.innerHeight, window.scrollY, document.body.offsetHeight]
})

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
  let retryLeft = 3

  url.searchParams.set('card_limit', String(props['card_limit']))
  url.searchParams.set('card_page', String(page.value))
  url.searchParams.set('ordering', String(props['card_order']))
  url.searchParams.set('storage', String(props['storage']))

  while (retryLeft > 0) {
    fetch(url)

        // Handle http error
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })

        // Process the returned JSON data
        .then(data => {
          user_cards.value = group_same_cards(data)
          retryLeft = 0
        })

        // Handle any errors that occurred during the fetch
        .catch(error => {
          console.error('Error:', error);

        });
    retryLeft -= 1
  }
}

function search_card() {
  const url = new URL(`${curr_api}/card/search_by_name`)
  url.searchParams.set('name', search_text.value)
  fetch(url)
      .then(response => response.json())
      .then(data => {

        user_cards.value = group_same_cards(data)
        console.log(data);
      })
}

function reset_card_search() {
  page.value = 0
  get_all_cards()
}

const handleInfiniteScroll = () => {

  const endOfPage = (window.innerHeight + 400) + window.scrollY >= document.body.offsetHeight;

  // console.log(search_text.value)

  if (search_text.value.length > 0) {
    return
  }

  if (endOfPage && !pageLoading.value && !pageFullLoaded.value) {

    console.log('loading more...')

    pageLoading.value = true
    page.value += 1

    const url = new URL(`${curr_api}/card/get_all`)
    url.searchParams.set('card_page', String(page.value))
    url.searchParams.set('ordering', String(props['card_order']))
    url.searchParams.set('card_limit', String(props['card_limit']))

    fetch(url)
        .then(response => response.json())
        .then(data => {

          if (data.length < 1) {
            pageFullLoaded.value = true
          }

          console.log('test', data);
          user_cards.value = group_same_cards(user_cards.value.concat(data))

          console.log('usercards', user_cards.value)

          pageLoading.value = false
        })
  }

};


onMounted(() => {
  get_all_cards()
  window.addEventListener("scroll", handleInfiniteScroll);
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
  <div class="card_list_wrapper" id="card_feed">

<!--    <edit-tools v-if="is_card_editing"></edit-tools>-->

<!--    <div class="search_bar_wrapper">-->
<!--      <label for="search_bar" style="margin-right: 5px">Search card</label>-->
<!--      <input type="text" id="search_bar" v-model="search_text" @keydown.enter="search_card"-->
<!--             @keydown.esc="reset_card_search"-->
<!--             @focus="$event.target.select()">-->
<!--      <button @click="search_card">🔍</button>-->
<!--      <button @click="reset_card_search">✘</button>-->
<!--    </div>-->


    <div v-if="serverStatus==='loaded'" class="card_list">
      <div v-for="card in user_cards" :key="card['user_card_id']">
        <CardMaster :card="card"></CardMaster>
      </div>
    </div>



  </div>
</template>

<style scoped>
.card_list_wrapper {
  width: 90%;
  margin: 10px auto 10px auto;
  /*outline: 1px solid red;*/

  display: flex;
  flex-flow: column wrap;
}

.card_list {
  /*outline: 3px solid green;*/

  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(v-bind(card_width), 1fr));
  /*grid-template-columns: repeat(20, 1fr);*/
  gap: 10px;
  margin-top: 10px;
  justify-items: left;
}

</style>
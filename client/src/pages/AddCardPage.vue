<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardMaster from "../components/card/CardMaster.vue";
import CardList from "../components/card list/CardList.vue";
import {request_cards} from "../components/requests.js";

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);
const curr_api = inject("curr_api");
const card_storages = inject("card_storages");
const is_card_updated = inject("is_card_updated");

let cards_preview = ref([])
let cards_new = ref([])
let default_storage = ref(0)

let card_name = ref('')
let card_image = ref()

function find_by_name(text) {
  console.log(text)

  const url = new URL(`${curr_api}/card/search_template_by_name`)
  url.searchParams.set('name', text)

  fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        cards_preview.value = data
      })
      .catch(error => {
      })
}

async function get_new_cards() {
  console.log('getting cards')
  await request_cards({limit: 5, order: 'new_first', page: 0})
      .then(result => {
        console.log(result)
        cards_new.value = result
      })
}

function add_card(id) {
  const url = new URL(`${curr_api}/card/add`)
  url.searchParams.set('id', id)
  url.searchParams.set('storage_id', String(default_storage.value))

  fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        is_card_updated.value = true
        get_new_cards()
      })
      .catch(error => {
      })
}

onMounted(() => {
  get_new_cards()
})
// watch(is_card_updated, (newV, oldV) => {
//   if (newV === true) {
//     console.log('card updated, AddCardPage', newV, oldV)
//     get_new_cards()
//     is_card_updated.value = false
//   }
// })
</script>

<template>

  <div class="add_cards_wrapper">

    <div class="default_storage">
      <button :key="storage['id']"
              :class="default_storage===storage['id'] ? 'highlight' : ''"
              v-for="storage in card_storages"
              @click="default_storage=storage['id']"
      >{{ storage['name'] }}
      </button>
    </div>

    <div class="all_cards_new">
      <div class="size_override">
        <card-list card_limit="15" card_order="new_first" storage="undefined"></card-list>
      </div>
    </div>

    <div class="card_previews">
      <div v-for="card in cards_preview" :key="card['card_template_id']">
        <card-master :card="card"></card-master>
        <button @click="add_card(card['card_template_id'])">add</button>
      </div>
    </div>

    <div class="card_search">
      <input v-model="card_name" placeholder="card name" @keydown.enter="find_by_name($event.target.value)">
    </div>

  </div>
</template>

<style scoped>
.add_cards_wrapper {
  /*display: flex;*/
}

.card_search {
  margin: 10px;
}

.card_previews {
  margin: 10px;
  display: flex;
  flex-flow: row wrap;
}

.all_cards_new {
  margin: 10px;
  display: flex;
  flex-flow: row wrap;
}

.default_storage {
  width: fit-content;
  margin: 10px;
  display: flex;
  flex-flow: column;
  gap: 2px;
}

.highlight {
  background-color: greenyellow;
  border-radius: 3px;
}

.size_override {
  max-height: 300px;
  clip-path: inset(0 0 0 0);
  overflow: hidden;
  width: 100%;
}
</style>
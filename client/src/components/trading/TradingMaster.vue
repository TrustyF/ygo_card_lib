<script setup>
import {computed, inject, ref} from "vue";
import CardMaster from "../card/CardMaster.vue";


let props = defineProps(["test"]);
let emits = defineEmits(["test"]);
const curr_api = inject("curr_api");

const card_size = inject("card_size");
const card_width = computed(() => String(card_size.value[0]) + 'px')
const card_height = computed(() => String(card_size.value[1]) + 'px')

let my_cards = ref([])
let trading_cards = ref([])
let library_preview = ref([])
let cards_preview = ref([])
let current_card_id = ref(0)

let my_price = computed(() => Math.round((my_cards.value.reduce((a, b) => a + (b['price']), 0) * 1.36) * 100) / 100)
let trade_price = computed(() => Math.round((trading_cards.value.reduce((a, b) => a + (b['price']), 0) * 1.36) * 100) / 100)
let price_diff = computed(() => Math.round((my_price.value - trade_price.value) * 10) / 10)

let my_price_color = computed(() => {
  if (my_price.value > trade_price.value) return 'green'
  else if (my_price.value === trade_price.value) return ''
  else return 'red'
})
let trade_price_color = computed(() => {
  if (my_price.value < trade_price.value) return 'green'
  else if (my_price.value === trade_price.value) return ''
  else return 'red'
})

async function get_templates(text) {
  console.log(text)

  const url = `${curr_api}/card/get_template`
  url.searchParams.set('search', text)
  url.searchParams.set('limit', String(4))

  cards_preview.value = await fetch(url).then(response => response.json())
}

async function get_card(text) {
  console.log(text)
  const url = `${curr_api}/card/get`
  if (text !== undefined || text === "") url.searchParams.set('search', text)
  url.searchParams.set('card_limit', String(3))
  url.searchParams.set('card_page', String(0))

  library_preview.value = await fetch(url).then(response => response.json())
}

function add_from_lib(index, array) {
  array.push(library_preview.value[index])

}

async function add_template(id, array) {
  const url = `${curr_api}/card/get_real_card`
  url.searchParams.set('id', String(id))

  const result = await fetch(url).then(response => response.json())
  array.push(result)
}

function swap(index, source, target) {
  target.push(source[index])
  source.splice(index, 1)
}

function clear(index, array) {
  array.splice(index, 1)
}

function mark_cards_as_sold(array) {
  array.forEach((elem) => {
    const url = `${curr_api}/card/i_update`
    url.searchParams.set('id', String(elem['user_card_id']))
    url.searchParams.set('attrib', 'is_sold')
    url.searchParams.set('value', String(1))
    fetch(url)
  })
  array.length = 0
}

function add_cards_to_permanent_library(array) {
  array.forEach((elem) => {
    console.log(elem)
    const url = `${curr_api}/card/add`
    url.searchParams.set('id', String(elem['card_template_id']))
    url.searchParams.set('code_id', String(elem['card_id']))
    url.searchParams.set('storage_id', '10')

    fetch(url)
  })
  array.length = 0
}

</script>

<template>
  <div class="trading_wrapper">

    <div class="search_zone">

      <div class="search_wrapper">
        <input placeholder="Search library" @click="$event.target.select()"
               @keydown.enter="get_card($event.target.value)">

        <div class="card_preview_wrapper" style="height: 260px;">
          <div class="card_preview" v-for="(card,i) in library_preview" :key="card['card_template_id']">
            <card-master :card="card" @click="add_from_lib(i,my_cards)"></card-master>
          </div>
        </div>

      </div>
      <div class="search_wrapper">

        <input placeholder="Search new" @click="$event.target.select()"
               @keydown.enter="get_templates($event.target.value)">

        <div class="card_preview_wrapper" style="height: 260px;">
          <div class="card_preview" v-for="card in cards_preview" :key="card['card_template_id']">
            <card-master :card="card"></card-master>

            <div class="card_sets">
              <button style="text-align: left;word-break: normal;font-size: 0.7em" v-for="card_set in card['sets']"
                      :key="card_set['card_id']" @click="add_template(card_set['card_id'],trading_cards)">
                <p style="font-weight: bold;font-size: 1.1em"> {{ `${card_set['card_code']}` }} </p>
                <p style="font-size: 1em"> {{ `${card_set['card_rarity']} ${card_set['card_edition']}` }} </p>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="separator_bar"></div>

    <div class="price_zone">
      <h1 :class="`price ${my_price_color}`">{{ `$${my_price}` }}</h1>
      <h1 class="price">{{ `${price_diff > 0 ? '+' : '-'} $${Math.abs(price_diff)}` }}</h1>
      <h1 :class="`price ${trade_price_color}`">{{ `$${trade_price}` }}</h1>
    </div>

    <div class="zone_wrapper">

      <div class="left_zone">
        <h1>Library</h1>

        <div class="card_preview_wrapper">
          <div class="card_preview" style="flex-flow: column nowrap" v-for="(card,i) in my_cards"
               :key="card['card_template_id']">
            <card-master :card="card" :size_multiplier="0.5"></card-master>
            <button class="button" @click="swap(i,my_cards,trading_cards)">swap</button>
            <button class="button" @click="clear(i,my_cards)">clear</button>
          </div>
        </div>

        <button class="button" @click="mark_cards_as_sold(my_cards)">Mark all as sold</button>

      </div>
      <div class="right_zone">
        <h1>Trading</h1>

        <div class="card_preview_wrapper">
          <div class="card_preview" style="flex-flow: column nowrap" v-for="(card,i) in trading_cards"
               :key="card['card_template_id']">
            <card-master :card="card" :size_multiplier="0.5"></card-master>
            <button class="button" @click="swap(i,trading_cards,my_cards)">swap</button>
            <button class="button" @click="clear(i,trading_cards)">clear</button>
          </div>
        </div>

        <button class="button" @click="add_cards_to_permanent_library(trading_cards)">Add to permanent library</button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.trading_wrapper {
  width: 95%;
  margin: 20px auto 0 auto;
}

.zone_wrapper {
  display: flex;
  flex-flow: row nowrap;

  justify-content: center;
  align-content: space-evenly;
  /*align-items: center;*/
  /*justify-items: center;*/
  gap: 10px;
}

.search_zone {
  display: flex;
  flex-flow: row nowrap;
  align-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
}

.search_wrapper {
  width: 50%;
  /*height: 100%;*/
}

.price_zone {
  margin: 10px 0 0 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-content: center;
}

.price {
  text-align: center;
  /*flex-grow: 1;*/
}

.button {
  /*padding: 5px;*/
  background-color: #4b4b4b;
  color: white;
  border-radius: 5px;
  line-height: 0.4em;
  font-size: 0.7em;
  height: 15px;
  border: 2px solid grey;
}

.card_preview_wrapper {
  border-top: 2px solid dimgrey;

  display: flex;
  flex-flow: row wrap;
  overflow-y: scroll;
  background-color: #282828;
}

.card_preview {
  margin: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-items: center;
  justify-content: center;
  gap: 2px;
}

.card_sets {
  height: v-bind(card_height);
  display: flex;
  flex-flow: column nowrap;
  gap: 3px;
  overflow-y: scroll;
}

.left_zone {
  /*outline: 1px solid red;*/
  width: 50%
}

.right_zone {
  /*outline: 1px solid orange;*/
  width: 50%
}

.separator_bar {
  content: "";
  background-color: dimgrey;
  width: 100%;
  height: 2px;
  /*margin: 10px 0 10px 30px;*/
}

.red {
  color: red;
}

.green {
  color: greenyellow;
}

@media only screen and (max-width: 400px) {
  .price {
    font-size: 0.7em;
  }
}
</style>
<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
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

async function get_templates(text) {
  console.log(text)

  const url = new URL(`${curr_api}/card/get_template`)
  url.searchParams.set('search', text)
  url.searchParams.set('limit', String(4))

  const result = await fetch(url).then(response => response.json())
  cards_preview.value = result
}

async function get_card(text) {
  console.log(text)
  const url = new URL(`${curr_api}/card/get`)
  if (text !== undefined || text === "") url.searchParams.set('search', text)
  url.searchParams.set('card_limit', String(5))
  // url.searchParams.set('id', String(id))
  url.searchParams.set('card_page', String(0))
  // if (card_order.value !== undefined) url.searchParams.set('ordering', String(card_order.value))
  // if (card_storage.value !== undefined) url.searchParams.set('storage', String(card_storage.value))

  const result = await fetch(url).then(response => response.json())
  library_preview.value = result

}

function add_to_library_zone(index){
  my_cards.value.push(library_preview.value[index])
}
</script>

<template>
  <div class="trading_wrapper">

    <div class="zone_wrapper">
      <p>{{ current_card_id }}</p>
      <div class="left_zone">

        <div class="search_wrapper">
          <input placeholder="card name" @click="$event.target.select()"
                 @keydown.enter="get_card($event.target.value)">

          <div class="card_preview_wrapper">
            <div class="card_preview" v-for="(card,i) in library_preview" :key="card['card_template_id']">
              <card-master :card="card" @click="add_to_library_zone(i)"></card-master>
            </div>
          </div>

        </div>

        <h1>Library</h1>
        <div class="separator_bar"></div>

        <div class="card_preview_wrapper">
          <div class="card_preview" v-for="card in my_cards" :key="card['card_template_id']">
            <card-master :card="card"></card-master>
          </div>
        </div>

      </div>

      <div class="right_zone">

        <div class="search_wrapper">

          <input placeholder="card name" @click="$event.target.select()"
                 @keydown.enter="get_templates($event.target.value)">

          <div class="card_preview_wrapper">
            <div class="card_preview" v-for="card in cards_preview" :key="card['card_template_id']">
              <card-master :card="card"></card-master>

              <div class="card_sets">
                <button style="text-align: left;word-break: normal;font-size: 0.7em" v-for="card_set in card['sets']"
                        :key="card_set['card_id']" @click="current_card_id=card_set['card_id']">
                  <p style="font-weight: bold;font-size: 1.1em"> {{ `${card_set['card_code']}` }} </p>
                  <p> {{ `${card_set['card_rarity']}` }} </p>
                </button>
              </div>
            </div>
          </div>

        </div>

        <h1>Trading</h1>
        <div class="separator_bar"></div>

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

.search_wrapper {
  height: 400px;
}

.card_preview_wrapper {
  display: flex;
  flex-flow: row wrap;
}

.card_preview {
  margin: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-items: center;
  justify-content: center;
  gap: 5px;
}

.card_sets {
  height: v-bind(card_height);
  display: flex;
  flex-flow: column nowrap;
  gap: 3px;
  overflow-y: scroll;
}

.left_zone {
  outline: 1px solid red;
  width: 50%
}

.right_zone {
  outline: 1px solid orange;
  width: 50%
}

.separator_bar {
  content: "";
  background-color: dimgrey;
  width: 100%;
  height: 1px;
  /*margin: 10px 0 10px 30px;*/
}
</style>
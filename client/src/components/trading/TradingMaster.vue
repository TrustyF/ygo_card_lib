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
let cards_preview = ref([])
let current_card_id = ref(0)

function find_by_name(text) {
  console.log(text)

  const url = new URL(`${curr_api}/card/search_template_by_name`)
  url.searchParams.set('search', text)
  url.searchParams.set('limit', String(5))

  fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        cards_preview.value = data
      })
      .catch(error => {
      })
}

function find_card_by_template_id(id) {

}

</script>

<template>
  <div class="trading_wrapper">

    <div class="search_wrapper">

      <input placeholder="card name" @click="$event.target.select()" @keydown.enter="find_by_name($event.target.value)">

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

    <div class="zone_wrapper">
      <p>{{ current_card_id }}</p>
      <div class="left_zone">
        <h1>Library</h1>

      </div>

      <div class="right_zone">
        <h1>Trading</h1>

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
  flex-grow: 1;
}

.right_zone {
  outline: 1px solid orange;
  flex-grow: 1;
}


</style>
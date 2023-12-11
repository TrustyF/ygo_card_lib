<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import CardMaster from "../card/CardMaster.vue";

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);

const curr_api = inject("curr_api");
const cards_selling = inject("cards_selling");

let total_price = computed(() => Math.round((cards_selling.value.reduce((a, b) => a + (b['price'] * b['amount']), 0) * 1.36) * 100) / 100)

function clear_card(index) {
  cards_selling.value.splice(index, 1)
}

function update_amount(index, amount) {
  cards_selling.value[index]['amount'] = Math.max((cards_selling.value[index]['amount'] + amount), 1)
}

function mark_sold(value) {

  cards_selling.value.forEach((elem) => {

    const url = new URL(`${curr_api}/card/mark_sold`)
    url.searchParams.set('id', String(elem['card_id']))
    url.searchParams.set('value', value)

    fetch(url)
  })


}
</script>

<template>
  <div>
    <div class="header_wrapper">

      <!--      <h1 class="storage_name">Selling</h1>-->
      <h2>{{ 'Total $' + total_price }}</h2>

      <div class="separator_bar"></div>


      <div class="list">
        <div class="list_element" v-for="(card,i) in cards_selling" :key="card['id']">
          <button class="button" @click="clear_card(i)">clear</button>
          <button class="button" @click="update_amount(i,1)">+1</button>
          <button class="button" @click="update_amount(i,-1)">-1</button>
          <card-master :card="card"></card-master>
        </div>
      </div>

      <button class="button" @click="mark_sold(1)">Mark as sold</button>

    </div>

  </div>
</template>

<style scoped>
.header_wrapper {
  display: flex;
  flex-flow: column wrap;
  justify-content: left;
  /*align-items: center;*/
  gap: 10px;
  padding: 10px 0 10px 30px;
  margin-top: 10px;
}

.separator_bar {
  content: "";
  background-color: dimgrey;
  /*width: 100%;*/
  height: 1px;
  /*margin: 10px 0 10px 30px;*/
}

.storage_name {
  font-size: 1.2em;
  color: white;
}

.list {
  width: 90%;
  height: 100%;
  margin: 10px auto 10px auto;
  /*outline: 1px solid red;*/

  display: flex;
  flex-flow: row wrap;
}

.button {
  cursor: pointer;
  border: 1px solid;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-size: 0.9em;
}

.button:hover {
  background-color: white;
  color: black;
}

@media only screen and (max-width: 400px) {
  .button {
    font-size: 0.7em;
  }
}
</style>
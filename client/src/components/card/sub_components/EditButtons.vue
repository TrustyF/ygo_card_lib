<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);

const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");

const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')

function delete_card(card_id) {
  const url = new URL(`${curr_api}/card/delete`)
  url.searchParams.set('id', String(card_id))
  fetch(url)
      .then(() => {
        is_card_updated.value = true
      })
}

function set_card_code(user_card_id, card_id) {
  const url = new URL(`${curr_api}/card/set_card_code`)
  url.searchParams.set('user_card_id', String(user_card_id))
  url.searchParams.set('card_id', String(card_id))
  fetch(url)
      .then(() => {
        is_card_updated.value = true
      })

  toggle_option(`set_list${user_card_id}`)
}

function toggle_option(option) {
  let target = document.getElementById(option)

  if (target.classList.contains('open')) {
    target.classList.remove('open')
  } else {
    target.classList.add('open')
  }
}
</script>

<template>
  <div class="buttons_wrapper">
    <button @click="delete_card(card.id)">x</button>

    <button @click="toggle_option(`set_list${card['user_card_id']}`)">Set</button>
    <div :id="`set_list${card['user_card_id']}`" class="collapsable">
      <div class="set_button" v-for="set in card['sets']" :key="set['card_code']">
        <button @click="set_card_code(card['user_card_id'],set['card_id'])">
          {{ `${set['card_code']} ${set['card_rarity'] !== 'Common' ? " - " + set['card_rarity'] : ''}` }}
        </button>
      </div>
    </div>

    <!--    <div class="set_list" v-if="card['storage_id']===null">-->
    <!--      <div class="set_button" v-for="set in card['sets']" :key="set['card_code']">-->
    <!--        <button @click="set_card_code(set['card_code'],card.id)">{{ `${set['card_code']} ${set['card_rarity']!=='Common' ? " - " + set['card_rarity'] : ''}` }}</button>-->
    <!--      </div>-->
    <!--    </div>-->

  </div>
</template>

<style scoped>
.buttons_wrapper {
  width: v-bind(card_width);
  max-height: v-bind(card_height);
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  /*outline: 1px solid red;*/
  z-index: 10;
  overflow-y: scroll;
  scrollbar-width: none;
}

.collapsable {
  visibility: hidden;
  opacity: 0;
}

.open {
  visibility: visible;
  opacity: 1;
}
</style>
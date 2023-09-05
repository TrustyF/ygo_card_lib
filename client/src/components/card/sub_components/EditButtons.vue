<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);

const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");
const card_storages = inject("card_storages");

const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')
const card_languages = ["French", "null"]

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

function set_card_storage(user_card_id, storage_id) {
  const url = new URL(`${curr_api}/card/set_card_storage`)
  url.searchParams.set('user_card_id', String(user_card_id))
  url.searchParams.set('storage_id', String(storage_id))
  fetch(url)
      .then(() => {
        is_card_updated.value = true
      })

  toggle_option(`storage_list${user_card_id}`)
}

function set_card_language(user_card_id, language) {
  const url = new URL(`${curr_api}/card/set_card_language`)
  url.searchParams.set('user_card_id', String(user_card_id))
  url.searchParams.set('language', String(language))
  fetch(url)
      .then(() => {
        is_card_updated.value = true
      })

  toggle_option(`language_list${user_card_id}`)
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

    <div>
      <button class="main_list_button" @click="delete_card(card['user_card_id'])">x</button>
    </div>

    <div>
      <button class="main_list_button" @click="toggle_option(`set_list${card['user_card_id']}`)">Set</button>

      <div class="category">
        <div :id="`set_list${card['user_card_id']}`"
             :class="card['card_id']===null ? 'collapsable open': 'collapsable'">
          <div class="set_button" v-for="set in card['sets']" :key="set['card_code']+card['user_card_id']">
            <button @click="set_card_code(card['user_card_id'],set['card_id'])">
              {{ `${set['card_code']} ${set['card_rarity'] !== 'Common' ? " - " + set['card_rarity'] : ''}` }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <div>
      <button class="main_list_button" @click="toggle_option(`storage_list${card['user_card_id']}`)">Storage</button>

      <div class="category">
        <div :id="`storage_list${card['user_card_id']}`" class="collapsable">
          <div class="storage_button" v-for="storage in card_storages" :key="storage['id']+card['user_card_id']">
            <button @click="set_card_storage(card['user_card_id'],storage['id'])">
              {{ storage['name'].replace(/_/g, ' ') }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <div>
      <button class="main_list_button" @click="toggle_option(`language_list${card['user_card_id']}`)">Language</button>

      <div class="category">
        <div :id="`language_list${card['user_card_id']}`" class="collapsable">
          <div class="language_button" v-for="lang in card_languages" :key="lang+card['user_card_id']">
            <button @click="set_card_language(card['user_card_id'],lang)">
              {{ lang }}
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.buttons_wrapper {
  max-width: v-bind(card_width);
  max-height: v-bind(card_height);
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
  /*outline: 1px solid red;*/
  z-index: 10;

  /*overflow-y: scroll;*/
  /*scrollbar-width:none;*/
}

.main_list_button {
  background-color: #054a65;
  outline: none;
  border-style: none;
  border-radius: 5px;
  box-shadow: inset 1px 1px 1px #1fb1a2;
  color: white;
  padding: 3px 7px 3px 7px;
}

.category {
  /*outline: 1px solid greenyellow;*/
  position: absolute;
  white-space: nowrap;
  left: 0;
  overflow-y: scroll;
  scrollbar-width: none;

  max-height: 220px;
}

.collapsable {
  visibility: hidden;
  opacity: 0;
  height: 0;
  width: 0;
}

.open {
  visibility: visible;
  opacity: 1;
  height: auto;
  width: auto;

}
</style>
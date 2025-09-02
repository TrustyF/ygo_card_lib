<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);

const curr_api = inject("curr_api");
const card_size = inject("card_size");
const is_card_updated = inject("is_card_updated");
const card_storages = inject("card_storages");
const debug_mode = inject("debug_mode");

const visible = ref(false)

const card_width = computed(() => String(card_size.value[0]) + 'px')
const card_height = computed(() => String(card_size.value[1]) + 'px')
const card_languages = ["French", "null"]
const card_damages = ["Light played", "Played", "Poor", "Damaged", "null"]

async function delete_card(card_id) {
  console.log('delete', card_id)

  const url = `${curr_api}/card/delete`
  url.searchParams.set('id', String(card_id))

  const result = await fetch(url)
  if (result.ok) is_card_updated.value = true
}

async function update_card(user_card_id, attr_name, attribute) {

  let url

  if (typeof attribute === 'number') {
    url = `${curr_api}/card/i_update`
  } else {
    url = `${curr_api}/card/s_update`
  }

  url.searchParams.set('id', String(user_card_id))
  url.searchParams.set('attrib', String(attr_name))
  url.searchParams.set('value', String(attribute))

  const result = await fetch(url)

  if (result.ok) {
    is_card_updated.value = true
    console.log('card updated',user_card_id)
    toggle_option(`${attr_name}_list${user_card_id}`)
  }
}

function toggle_option(option) {
  let target = document.getElementById(option)

  if (target === null) return

  if (target.classList.contains('open')) {
    target.classList.remove('open')
  } else {
    target.classList.add('open')
  }
}

</script>

<template>
  <!--  <div class="hit_box" @click="visible = !visible"></div>-->
  <div style="position: relative;">
    <button v-if="debug_mode"
            style="border: 0 solid white;border-radius: 50%;width: 12px;height: 12px;position: absolute;z-index: 25;left:0;"
            @click="visible = !visible"></button>

    <div class="buttons_wrapper" v-if="visible">

      <div class="main_list_button" @click="delete_card(card['user_card_id'])">x</div>
      <div class="main_list_button" @click="update_card(card['user_card_id'],'is_sold',0)">0x</div>


      <div>
        <div class="main_list_button" @click="toggle_option(`card_id_list${card['user_card_id']}`)">Set</div>
        <div class="category">
          <div :id="`card_id_list${card['user_card_id']}`"
               :class="card['card_id']===null ? 'collapsable open': 'collapsable'">
            <div class="set_button" v-for="set in card['sets']" :key="set['card_code']+card['user_card_id']">
              <button @click="update_card(card['user_card_id'],'card_id',set['card_id'])">
                {{ `${set['card_code']}` }}
              </button>
              <button v-if="set['card_edition']!=='Unlimited' || set['card_rarity']!=='Common'">
                {{
                  `${set['card_rarity'] !== 'Common' ? set['card_rarity'] : ''} ${set['card_edition']}`
                }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="main_list_button" @click="toggle_option(`storage_id_list${card['user_card_id']}`)">Storage</div>
        <div class="category">
          <div :id="`storage_id_list${card['user_card_id']}`" class="collapsable">
            <div class="storage_button" v-for="storage in card_storages" :key="storage['id']+card['user_card_id']">
              <button @click="update_card(card['user_card_id'],'storage_id',storage['id'])" style="display: flex;  font-size: 0.6em;
align-items: center;">
                {{ storage['name'].replace(/_/g, ' ') }}
                <img :src="`/images_storage/${storage['name']}_thumbnail.png`" alt="storage_image"
                     style="height: 25px;margin-left: 10px">
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="main_list_button" @click="toggle_option(`card_language_list${card['user_card_id']}`)">Language
        </div>
        <div class="category">
          <div :id="`card_language_list${card['user_card_id']}`" class="collapsable">
            <div class="language_button" v-for="lang in card_languages" :key="lang+card['user_card_id']">
              <button @click="update_card(card['user_card_id'],'card_language',lang)">
                {{ lang }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="main_list_button" @click="toggle_option(`card_damage_list${card['user_card_id']}`)">Damage</div>
        <div class="category">
          <div :id="`card_damage_list${card['user_card_id']}`" class="collapsable">
            <div class="damage_button" v-for="damage in card_damages" :key="damage+card['user_card_id']">
              <button @click="update_card(card['user_card_id'],'card_damage',damage)">
                {{ damage }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.hit_box {
  /*position: absolute;*/
  /*outline: 1px solid red;*/
  width: v-bind(card_width);
  height: v-bind(card_height);
  z-index: 1;

  cursor: pointer;
}

.buttons_wrapper {
  max-width: v-bind(card_width);
  /*max-height: v-bind(card_height);*/

  position: relative;
  display: flex;
  flex-flow: row wrap;

  cursor: pointer;
  user-select: none;

  z-index: 5;
}

.main_list_button {
  background-color: #054a65;
  outline: none;
  border-style: none;
  /*border-radius: 5px;*/
  font-size: 0.6em;
  box-shadow: inset 1px 1px 1px #1fb1a2;
  color: white;
  padding: 2px 5px 2px 5px;
}

.category {
  /*outline: 1px solid greenyellow;*/
  position: absolute;
  white-space: nowrap;
  left: 0;
  overflow-y: scroll;
  scrollbar-width: none;
  max-height: 200px;
}

.collapsable {
  visibility: hidden;
  opacity: 0;
  height: 0;
  width: 0;

  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
}

.open {
  visibility: visible;
  opacity: 1;
  height: auto;
  width: auto;

}
</style>
<script setup>
import {inject, onMounted, watch, ref, computed, onUnmounted} from "vue";
import CardMasterComponent from "../components/card/CardMaster.vue";
import CardList from "../components/card list/CardList.vue";

// let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const is_card_updated = inject("is_card_updated");
const is_card_editing = inject("is_card_editing");


let sliders_mapping = ref([
  {
    "title": "Exposure",
    "range": [0, 10, 5]
  },
  {
    "title": "contrast",
    "range": [0, 500, 250]
  },
  {
    "title": "median_blur",
    "range": [0, 20, 10]
  },
  {
    "title": "auto_bright_bias",
    "range": [1, 100, 50]
  },
  {
    "title": "canny",
    "range": [1, 1000, 500]
  },
  {
    "title": "dilate",
    "range": [1, 100, 50]
  },
  {
    "title": "white_cut",
    "range": [10, 255, 50]
  },
])
let user_cards = ref([])
let is_webcam = ref(false)
let is_detecting = ref(false)
let polling_cards = ref(undefined)


function get_slider_settings() {

  fetch(`${curr_api}/card_detector/get_settings`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        sliders_mapping.value.forEach(value => {
          value['range'][2] = data[value['title']]
        })
      })
}

function set_slider_settings(slider) {

  console.log(slider.target.id)
  console.log(slider.target.value)

  const params = {
    'slider_name': slider.target.id.split(".")[0].toLowerCase(),
    'slider_value': parseInt(slider.target.value)
  }

  fetch(`${curr_api}/card_detector/set_settings`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(params)
  })
      .then(data => {
        console.log(data);
      })
}

function start_detection() {
  is_detecting.value = !is_detecting.value

  const url = `${curr_api}/card_detector/start_detection`
  url.searchParams.set('state', String(is_detecting.value))
  fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })

  if (polling_cards.value === undefined) {
    poll_cards()
  } else {
    clearTimeout(polling_cards.value)
    polling_cards.value = undefined
  }
}

function poll_cards() {
  is_card_updated.value = true
  polling_cards.value = setTimeout(poll_cards, 1000)
}

function toggle_webcam_feed(state) {
  const url = `${curr_api}/card_detector/toggle_feed`
  url.searchParams.set('state', state)
  fetch(url)
      .then(() => {
        is_webcam.value = state
        console.log(is_webcam.value)
      })
}

onMounted(() => {
  get_slider_settings()
  toggle_webcam_feed(true)
  is_card_editing.value = true
})

onUnmounted(() => {
  toggle_webcam_feed(false)
})

</script>

<template>
  <div class="wrapper">

    <div class="webcams">
      <div>
        <img style="height: 400px" v-if="is_webcam" :src="`${curr_api}/card_detector/get_webcam_feed?cache=${new Date()}`" alt="feed">
        <img style="height: 400px" v-if="is_webcam" :src="`${curr_api}/card_detector/get_filter_feed?cache=${new Date()}`"
             alt="filter_feed">
      </div>

      <div class="settings_sliders">
        <div class="slider_wrapper" v-for="slider in sliders_mapping" :key="slider['title']">
          <label for="exposure_slider">{{ slider['title'] }}</label>
          <input type="range" :min="slider['range'][0]" :max="slider['range'][1]" :value="slider['range'][2]"
                 class="slider"
                 :id="slider['title'] + '.slider'" @change="set_slider_settings">

        </div>
      </div>

      <div style="position: absolute;top: 0">
        <button style="margin: 25px;padding: 5px" @click="start_detection">Start scan
          <p v-if="is_detecting" style="font-weight: bold;color: forestgreen">polling</p>
        </button>
      </div>

    </div>

    <div class="card_list">
      <card-list card_limit="10" card_order="new"></card-list>
    </div>

  </div>

</template>

<style scoped>
.wrapper {
  display: flex;
  /*gap: 20px;*/
  flex-flow: row nowrap;
  /*width: 100vw;*/
  height: 95vh;
}

.card_list {
  outline: 5px solid purple;
  margin: auto;
  width: 60%;
}

.webcams {
  outline: 5px solid purple;

  width: 35%;
  margin: auto;
  position: relative;
}

.settings_sliders {
  padding: 10px;
  width: 300px;
}

.slider_wrapper {
  display: flex;
  flex-flow: column nowrap;
}
</style>
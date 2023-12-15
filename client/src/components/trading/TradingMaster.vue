<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import SellingMaster from "../selling/SellingMaster.vue";
import CardList from "../card list/CardList.vue";

let props = defineProps(["test"]);
let emits = defineEmits(["test"]);
const curr_api = inject("curr_api");

let my_cards = ref([])

</script>

<template>
  <div class="zone_wrapper">

    <div class="left_zone">
      <h1>Library</h1>

      <div class="all_cards_lib">
        <div class="size_override">
          <card-list card_limit="15" storage="undefined"></card-list>
        </div>
      </div>

      <selling-master :cards="my_cards"></selling-master>
    </div>

    <div class="right_zone">
      <h1>Trading</h1>
      <button>test</button>
    </div>

  </div>
</template>

<style scoped>
.zone_wrapper {
  display: flex;
  flex-flow: row nowrap;
  width: 95%;
  margin: 20px auto 0 auto;
  justify-content: center;
  align-content: space-evenly;
  /*align-items: center;*/
  /*justify-items: center;*/
  min-height: 200px;
  gap: 10px;
}

.left_zone {
  outline: 1px solid red;
  flex-grow: 1;
}

.right_zone {
  outline: 1px solid orange;
  flex-grow: 1;
}
.all_cards_lib {
  /*margin: 10px;*/
  /*display: flex;*/
  /*flex-flow: row wrap;*/
}
.size_override {
  max-height: 300px;
  clip-path: inset(0 0 0 0);
  overflow: scroll;
  flex-grow: 1;
}
</style>
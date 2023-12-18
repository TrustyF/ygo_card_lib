<script setup>
import {inject, onMounted, toRefs, watch, ref, computed} from "vue";

let props = defineProps(["card","size_multiplier"]);
const is_card_editing = inject("is_card_editing");
const curr_api = inject("curr_api");
const card_size = inject("card_size");

const card_width = computed(() => String(card_size.value[0] * props['size_multiplier']) + 'px')
const card_height = computed(() => String(card_size.value[1] * props['size_multiplier']) + 'px')

</script>

<template>
  <div class="wrapper" v-if="card['card_id']!==null">

    <!--    <img style="margin: -10px;max-width: 50px;object-fit: contain" :src="`${curr_api}/storage/get_image?id=${card['storage_id']}`" alt="banned">-->
    <div class="badge red" v-if="card['is_sold']">0</div>
    <div class="badge cyan" v-if="card['amount']>1"> {{ card['amount'] }}</div>

    <img v-if="card['ban_tcg']==='Banned' && is_card_editing" src="/cards/banned.png" alt="banned">
    <img v-if="card['ban_tcg']==='Limited' && is_card_editing" src="/cards/limited.png" alt="banned">
    <img v-if="card['ban_tcg']==='Semi-Limited' && is_card_editing" src="/cards/semi_limited.png" alt="banned">

<!--    <div class="badge yellow" v-if="card['is_staple'] && is_card_editing">!</div>-->

    <!--    <div class="badge red" style="font-size: 0.7em" v-if="card['rarity_code']!=='(C)'">{{ card['rarity_code'].replace('(','').replace(')','') }}</div>-->

  </div>

  <div class="tag_wrapper">
    <div class="tag red" v-if="card['card_damage']!==null">{{ card['card_damage'] }}</div>
    <div class="tag green" v-if="card['language']!==null"> {{ card['language'] }}</div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  right: -0.5em;
  top: -0.5em;
  gap: 2px;

  width: 20px;
  z-index: 10;
}

.tag_wrapper {
  /*outline: 1px solid red;*/
  display: flex;
  flex-flow: row wrap;
  position: absolute;
  left: 0;
  bottom: 0;
  gap: 3px;
  padding: 0 3px 4px 3px;

  width: v-bind(card_width);
}

.tag {
  /*width: 25px;*/
  /*max-height: 25px;*/

  border-radius: 5px;
  padding: 1px 5px 1px 5px;

  color: white;
  font-family: Carlito, sans-serif;
  font-size: 0.6em;
  font-weight: bold;
  text-shadow: 1px 1px 2px black, 0 0 3px black;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  filter: drop-shadow(1px 1px 3px black);
}

.badge {
  height: 20px;
  border-radius: 50%;

  color: white;
  font-family: Carlito, sans-serif;
  font-size: 1em;
  font-weight: bold;
  text-shadow: 0 0 1px black, 0 0 2px black, 0 0 4px black, 0 0 2px black;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  filter: drop-shadow(2px 2px 3px black);
}


.cyan {
  background-color: darkcyan;
  /*box-shadow: inset 1px 1px 2px #0fdcde, inset -2px -2px 2px #004748;*/
}

.purple {
  background-color: #b20081;
  /*box-shadow: inset 1px 1px 2px #e329ac, inset -2px -2px 2px #620043;*/
}

.green {
  background-color: #18b100;
  /*box-shadow: inset 1px 1px 2px #41e526, inset -2px -2px 2px #126e00;*/
}

.red {
  background-color: #b10000;
  /*box-shadow: inset 1px 1px 2px #e81d1e, inset -2px -2px 2px #6b0001;*/
}

.yellow {
  background-color: #e87707;
  /*box-shadow: inset 1px 1px 2px #ffa854, inset -2px -2px 2px #8c4500;*/
}

@media only screen and (max-width: 400px) {
  .wrapper {
    width: 15px;
    right: -0.35em;
    top: -0.5em;
  }

  .badge {
    font-size: 0.7em;
    height: 15px;
  }

  .tag {
    font-size: 0.3em;
  }
}
</style>
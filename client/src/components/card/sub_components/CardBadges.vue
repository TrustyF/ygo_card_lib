<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["card"]);
const curr_api = inject("curr_api");
const card_size = inject("card_size");
const card_width = computed(() => String(card_size[0]) + 'px')
const card_height = computed(() => String(card_size[1]) + 'px')

</script>

<template>
  <div class="wrapper" v-if="card['card_id']!==null">
    <div class="badge cyan" v-if="card['amount']>1"> {{ card['amount'] }}</div>
    <div class="badge purple" v-if="card['rarity_code']!=='(C)'"> {{ card['rarity_code'].replace('(','').replace(')','').replace('/(f)/','') }}</div>
    <div class="badge green" v-if="card['language']!==null"> {{ card['language'].slice(0,2) }}</div>
    <div class="badge red" v-if="card['is_staple']!==false">!</div>
<!--    <div class="badge red" v-if="card['ban_tcg']!==null">{{ card['ban_tcg']==='Limited' ? 1 : card['ban_tcg']==='Semi-Limited' ? 2 : card['ban_tcg']==='Banned' ? '⊘' : ""}}</div>-->
    <div class="badge red" v-if="card['ban_tcg']!==null">{{ card['ban_tcg'] }}</div>
<!--    <div class="badge red" v-if="card['archetype']!==null">{{ card['archetype'] }}</div>-->
  </div>
</template>

<style scoped>
.card_image {
  width: v-bind(card_width);
  height: v-bind(card_height);
}
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  right: -10px;
  top: -10px;
  gap: 5px;
}
.badge {
  width: 25px;
  height: 25px;

  color: white;
  font-family: Carlito,sans-serif;
  font-size: 1.2em;
  font-weight: bold;
  text-shadow: 1px 1px 2px black , 0 0 3px black;

  display: flex;
  justify-content: center;
  align-items: center;

  filter: drop-shadow(2px 2px 3px black);
}
.cyan {
  background-color: darkcyan;
  box-shadow: inset 1px 1px 2px #0fdcde,inset -2px -2px 2px #004748;
  border-radius: 50%;

}
.purple {
  background-color: #b20081;
  box-shadow: inset 1px 1px 2px #e329ac,inset -2px -2px 2px #620043;
  border-radius: 50%;

}
.green {
  background-color: #18b100;
  box-shadow: inset 1px 1px 2px #41e526,inset -2px -2px 2px #126e00;
  border-radius: 50%;
}
.red {
  background-color: #b10000;
  box-shadow: inset 1px 1px 2px #e81d1e,inset -2px -2px 2px #6b0001;
  border-radius: 50%;
}
</style>
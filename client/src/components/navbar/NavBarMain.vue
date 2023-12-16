<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");
const debug_mode = inject("debug_mode");

</script>

<template>
  <div class="wrapper">
    <RouterLink class="link" to="/">Home</RouterLink>
    <RouterLink class="link" to="/all_cards">All Singles</RouterLink>
    <RouterLink class="link" to="/trade_cards">Trade Zone</RouterLink>
<!--    <RouterLink class="link" to="/sell_cards">Sell Zone</RouterLink>-->
    <RouterLink v-if="debug_mode" class="link" to="/add_cards">Add Card</RouterLink>
<!--    <RouterLink class="link" to="/scan_card">Card scan</RouterLink>-->
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #2c3e50;
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
}

.link {
  color: white;
  background-color: #4f89c5;
  padding: 10px;
  text-decoration: none;
}
.link:visited {
  color: white;
}
</style>
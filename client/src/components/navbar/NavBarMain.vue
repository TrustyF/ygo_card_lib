<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";

let props = defineProps(["test"]);
const curr_api = inject("curr_api");

</script>

<template>
  <div class="wrapper">
    <RouterLink class="link" to="/">Home</RouterLink>
    <RouterLink class="link" to="/cards">Cards</RouterLink>
    <RouterLink class="link" to="/scan_card">Card scan</RouterLink>
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
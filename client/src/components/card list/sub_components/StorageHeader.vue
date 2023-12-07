<script setup>
import {inject, onMounted, watch, ref, computed} from "vue";
import collapse_arrow from '/src/assets/ui/collapse_arrow.png'

let props = defineProps(["storage"]);
let emits = defineEmits(["collapsed"]);
const curr_api = inject("curr_api");

let collapse_elem = ref(null)

function emit_close() {
  emits('collapsed')

  if (collapse_elem.value.classList.contains('rotated')) {
    collapse_elem.value.classList.remove('rotated')

  } else {
    collapse_elem.value.classList.add('rotated')
  }
}

</script>

<template>
  <div class="header_wrapper">
    <img alt="storage_image" class="storage_image" :src="`${curr_api}/storage/get_image?id=${storage['id']}`">
    <h1 class="storage_name">{{ storage['name'].replace(/_/g, ' ') }}</h1>
    <img alt="collapse_button" ref="collapse_elem" class="collapse_button" :src="collapse_arrow" @click="emit_close()">
  </div>
  <div class="separator_bar"></div>
</template>

<style scoped>
.header_wrapper {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
  padding: 10px 0 10px 30px;
  margin-top: 10px;
}

.storage_image {
  height: 70px;
  margin: -20px;
  object-fit: contain;
}

.storage_name {
  font-size: 1.2em;
  color: white;
}

.separator_bar {
  content: "";
  background-color: dimgrey;
  width: 100%;
  height: 1px;
  margin: 10px 0 10px 30px;
}

.collapse_button {
  cursor: pointer;
  width: 20px;
  height: 20px;
  filter: invert() opacity(50%);
}

.rotated {
  transform: rotate(180deg);
}
</style>
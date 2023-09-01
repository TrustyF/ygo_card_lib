<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cards">Cards</RouterLink>
        <RouterLink to="/scan_card">Card scan</RouterLink>
      </nav>
  </header>
  <RouterView />

</template>

<style scoped>

</style>

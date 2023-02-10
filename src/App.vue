<template>
  <div>
    <FloatingActionButton />
    <Sidebar />
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/filter/Sidebar.vue';
import FloatingActionButton from './components/FloatingActionButton.vue';
import Navbar from './components/Navbar.vue';
import { useStore } from './composables/store';

const store = useStore()
</script>

<style>
html,
body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--surface-a);
}

.p-tabview-nav-container {
  position: sticky;
  top: 0
}
</style>

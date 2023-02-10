<template>
    <Sidebar v-model:visible="isSidebarOpen" :baseZIndex="10000" style="width:90vw">
        Sidebar stuff
    </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import { useStore } from '../../composables/store';

const { isSidebarOpen } = useStore()
</script>

<style scoped>

</style>
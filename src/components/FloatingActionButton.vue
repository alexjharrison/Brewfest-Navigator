<template>
    <Button :icon="`pi ${isSidebarOpen ? 'pi-filter-slash' : 'pi-filter'}`" class="p-button-rounded p-button-info fab"
        @click="isSidebarOpen = !isSidebarOpen" />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useStore } from '../composables/store';

const { isSidebarOpen } = useStore()
</script>

<style scoped>
.fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
}
</style>
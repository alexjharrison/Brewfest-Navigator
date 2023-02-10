<template>
    <div>
        <div class="flex align-items-center justify-content-between">
            <h1 class="m-auto font-semibold">{{
                filterState.floorSelected ? "Level " + filterState.floorSelected : "All"
            }} Beers</h1>
        </div>
        <ul class="p-0">
            <li v-for="beer in visibleBeers" :key="beer.id" class="mb-2 list-none">
                <BeerPreviewBox :beer="beer" />
            </li>
        </ul>
        <p v-if="visibleBeers.length === 0" class="text-xl mt-6">Nothin here...</p>
    </div>
</template>

<script setup lang="ts">
import BeerPreviewBox from '../components/BeerPreviewBox.vue';
import { useStore } from '../composables/store';

const { visibleBeers, filterState } = useStore()
</script>


<style scoped>

</style>
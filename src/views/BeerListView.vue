<template>
    <div>
        <h1>Beer List View</h1>
        <ul>
            <li v-for="beer in beers" :key="beer.id" class="mb-2">
                <p v-for="val, key in beer" class="m-0"><b>{{ key }}:</b> {{ val }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '../composables/store';

const { beers } = useStore()
</script>


<style scoped>

</style>
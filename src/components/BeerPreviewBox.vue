<template>
    <article @click="updateFilterState({ selectedBeerId: beer.id })"
        class="w-full max-w-30rem m-auto border-1 border-gray-100 p-1 border-round flex cursor-pointer">
        <img :src="beer.thumbnail" :alt="`${beer.name} Logo`">
        <div class="mx-2 text-xs w-full flex flex-column">
            <h1 class="text-sm m-0">{{ beer.name }}</h1>
            <p class="m-0 font-light"><span class="font-semibold">{{ beer.style }}</span><span
                    class="font-italic font-normal">{{
                        beer.substyle ? ` - ${beer.substyle}`
                            : ''
                    }}</span></p>
            <p class="m-0 mt-1 font-medium">{{ beer.breweryName }}</p>
            <div class="flex mt-auto mb-1 justify-content-around w-full align-self-end">
                <p class="m-0"> Table <span class="font-bold underline">{{ beer.table || '??' }}</span></p>
                <p class="m-0"><i class="pi pi-star text-xs"></i> {{ Math.round(beer.untappdScore * 100) / 100 }}
                </p>
                <p class="m-0" v-if="beer.abv !== null">{{ beer.abv }}%</p>
                <p class="m-0" v-if="beer.ibu !== null">{{ beer.ibu }} IBU</p>
                <p class="m-0 font-semibold" v-if="beer.isVip">VIP <i class="text-xs pi pi-lock-open"></i></p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { BeerWithMeta, useStore } from '../composables/store';

defineProps<{ beer: BeerWithMeta }>()

const { updateFilterState } = useStore()
</script>

<template>
    <div class="px-2">
        <div class="flex align-items-center">
            <Button @click="updateFilterState({ selectedBeerId: null })" icon="pi pi-arrow-left"
                class="p-button-rounded p-button-success m-4 flex-shrink-0" />
            <div>
                <h1 class="m-0 text-lg">{{ selectedBeer?.name }}</h1>
                <h3 class="mt-0 mb-0 text-center font-light text-lg">{{ beer.style }} {{
                    beer.substyle ? '- ' + beer.substyle :
                        ""
                }}
                </h3>
            </div>
        </div>
        <div class="flex align-items-center justify-content-evenly">
            <img :src="beer.thumbnail" alt="beer logo">
            <div class="text-xl">
                <p class="m-0 mb-2"> Floor <span class="font-bold underline">{{ floor }}</span></p>
                <p class="m-0"> Table <span class="font-bold underline">{{ beer.table || '??' }}</span></p>
            </div>
            <div class="text-xl">
                <p class="m-0 mb-2"><i class="pi pi-star text-xs"></i> {{ Math.round(beer.untappdScore * 100) / 100 }}
                </p>
                <p class="m-0 mb-2" v-if="beer.abv !== null">ABV: {{ beer.abv }}%</p>
                <p class="m-0 mb-2" v-if="beer.ibu !== null">IBU: {{ beer.ibu }}</p>
                <p class="m-0" v-if="beer.isVip">VIP <i class="ml-2 pi pi-lock-open"></i></p>
            </div>
        </div>
        <section>
            <div class="flex justify-content-around mt-4 text-xl">
                <div class="field-checkbox">
                    <Checkbox :disabled="!!beer.meta?.triedAt" inputId="tried" :model-value="beer.meta?.triedAt"
                        :binary="true" @change="updateBeerState({ triedAt: new Date() })" />
                    <label for="tried">Tried It!</label>
                </div>
                <div class="field-checkbox">
                    <Checkbox :disabled="!!beer.meta?.ranOut" inputId="kicked" :model-value="beer.meta?.ranOut"
                        :binary="true" @change="updateBeerState({ ranOut: true })" />
                    <label for="kicked">Kicked?</label>
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-xl m-1 font-medium">Excitement Score {{ beer.meta?.curiosityScore }}</h3>
                <Slider class="my-4" :model-value="beer.meta?.curiosityScore" :step=".5" :min="0" :max="10" />
                <h3 class="text-xl m-1 font-medium">For the Style Score {{ beer.meta?.styleScore }}</h3>
                <Slider class="my-4" :model-value="beer.meta?.styleScore" :step=".5" :min="0" :max="10" />
                <h3 class="text-xl m-1 font-medium">Overall Score {{ beer.meta?.overallScore }}</h3>
                <Slider class="my-4" :model-value="beer.meta?.overallScore" :step=".5" :min="0" :max="10" />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox'
import Slider from 'primevue/slider'
import { computed } from 'vue';
import { BeerWithMeta, useStore } from '../composables/store';

const { updateFilterState, selectedBeer, updateBeerState } = useStore()
const beer = computed(() => selectedBeer.value as unknown as BeerWithMeta)
const floor = computed(() => {
    if (beer.value.table === null) return "???"
    const floorRanges = [
        [1, 12],
        [13, 38],
        [39, 50],
        [51, 62],
    ];
    return floorRanges.reduce((acc, [start, end], i) => {
        if (beer.value.table === null) return acc
        if (beer.value.table >= start && beer.value.table <= end) {
            return i + 1
        }
        return acc
    }, 0)
})

</script>


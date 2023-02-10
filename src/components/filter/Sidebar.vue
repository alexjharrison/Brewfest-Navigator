<template>
    <Sidebar v-model:visible="isSidebarOpen" :baseZIndex="10000" style="width:90vw">
        <h1 class="m-0">Filters</h1>
        <h3>Sort By</h3>
        <Dropdown class="w-full" v-model="filterState.sortField" optionLabel="label" optionValue="value"
            :options="sortByOptions" />

        <h3>Show Vip?</h3>
        <div v-for="option of vipOptions" :key="option.value" class="field-radiobutton inline mr-3">
            <RadioButton :inputId="option.value" name="category" :value="option.value" v-model="filterState.showVip" />
            <label :for="option.value">{{ option.label }}</label>
        </div>

        <h3>Styles Search</h3>
        <MultiSelect class="w-full" v-model="filterState.stylesSelected" :options="allStyles" display="chip" />

        <h3>Substyles Search</h3>
        <MultiSelect class="w-full" w v-model="filterState.substylesSelected" :options="allSubstyles" display="chip" />

        <h3>Filter Out Styles</h3>
        <MultiSelect class="w-full" v-model="filterState.stylesOmitted" :options="allStyles" display="chip" />
    </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import RadioButton from 'primevue/radiobutton'
import MultiSelect from 'primevue/multiselect'
import Dropdown from 'primevue/dropdown'
import { useStore } from '../../composables/store';

const { isSidebarOpen, filterState, allBeers } = useStore()

const allStyles = [... new Set(allBeers.map(beer => beer.style))]
const allSubstyles = [...new Set(allBeers.map(beer => beer.substyle))].filter(s => s)

const vipOptions = [
    { label: "VIP Only", value: "vip" },
    { label: "Only Non-VIP", value: "novip" },
    { label: "All", value: "all" },

]

const sortByOptions = [
    { label: "My Most Wanted", value: "curiosityScore" },
    { label: "Brewery", value: "table" },
    { label: "Untappd Score", value: "untappdScore" },
    { label: "My Overall Score", value: "overallScore" },
    { label: "Best for the Style", value: "styleScore" },
    { label: "ABV", value: "abv" },
    { label: "IBU", value: "ibu" }
]
</script>

<template>
    <header>
        <TabView :active-index="filterState.floorSelected || 0"
            @tab-change="e => updateFilterState({ floorSelected: e.index || null })">
            <TabPanel header="All">
                <BeerListView />
            </TabPanel>
            <TabPanel :header="`L1`">
                <BeerListView />
            </TabPanel>
            <TabPanel :header="`L2`">
                <BeerListView />
            </TabPanel>
            <TabPanel :header="`L3`">
                <BeerListView />
            </TabPanel>
            <TabPanel :header="`L4`">
                <BeerListView />
            </TabPanel>
        </TabView>
    </header>
</template>

<script setup lang="ts">
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import { useStore } from '../composables/store';
import BeerListView from '../views/BeerListView.vue';

const { updateFilterState, filterState } = useStore()
</script>





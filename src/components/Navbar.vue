<template>
    <header>
        <TabView>
            <TabPanel header="All Beers">
                <BeerListView />
            </TabPanel>
            <TabPanel header="Map View">
                <MapView />
            </TabPanel>
        </TabView>
    </header>
</template>

<script setup lang="ts">
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import BeerListView from '../views/BeerListView.vue';
import MapView from '../views/MapView.vue';
</script>




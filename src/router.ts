import { createWebHashHistory, RouteRecordRaw } from "vue-router";
import { createRouter } from "vue-router";
import BeerDetailView from "./views/BeerDetailView.vue";
import BeerListView from "./views/BeerListView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/test/:id",
    name: "BeerDetail",
    component: BeerDetailView,
  },
  {
    path: "/test",
    name: "BeerList",
    component: BeerListView,
    props: true,
  },
];

export const router = createRouter({ history: createWebHashHistory(), routes });

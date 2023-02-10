import { ref } from "vue";
import beers from "../assets/beers";
import breweries from "../assets/breweries";

const isSidebarOpen = ref(false);

export function useStore() {
  return { beers, isSidebarOpen };
}

import { ref } from "vue";
import beers from "../assets/beers";
import breweries from "../assets/breweries";

const isSidebarOpen = ref(false);
console.log(
  beers.map((beer) => {
    /* @ts-ignore  */
    const table = breweries[beer.breweryName];
    if (!table) console.log(beer);
    return {
      ...beer,
      table,
    };
  })
);

export function useStore() {
  return { beers, isSidebarOpen };
}

import { ref } from "vue";
import beers from "../assets/beers";
import breweries from "../assets/breweries";
import { computed, reactive } from "vue";
import { useLocalStorage } from "@vueuse/core";

export type BeerMeta = {
  styleScore?: number;
  overallScore?: number;
  triedAt?: Date;
  curiosityScore?: number;
  ranOut?: boolean;
  comment?: string;
};
export type Filters = {
  floorSelected: number | null;
  breweriesSelected: Array<typeof beers[number]["breweryName"]>;
  stylesSelected: Array<typeof beers[number]["style"]>;
  stylesOmitted: Array<typeof beers[number]["style"]>;
  substylesSelected: string[];
  showVip: "vip" | "novip" | "all";
  selectedBeerId: number | null;
  disableFilters: boolean;
  sortField:
    | "styleScore"
    | "overallScore"
    | "curiosityScore"
    | "table"
    | "untappdScore"
    | "abv"
    | "ibu";
};

export type BeerWithMeta = typeof beers[number] & { meta: BeerMeta };

const isSidebarOpen = ref(false);
const beerMeta = useLocalStorage<Record<number, BeerMeta>>("meta", {});
const filterState = reactive<Filters>({
  floorSelected: null,
  breweriesSelected: [],
  stylesSelected: [],
  stylesOmitted: [],
  substylesSelected: [],
  showVip: "all",
  selectedBeerId: null,
  disableFilters: false,
  sortField: "curiosityScore",
});

export function useStore() {
  const selectedBeer = computed<BeerWithMeta | null>(() => {
    if (!filterState.selectedBeerId) return null;
    return {
      ...(beers.find(beer => beer.id === filterState.selectedBeerId) ||
        beers[0]),
      meta: beerMeta.value[filterState.selectedBeerId],
    };
  });

  function updateFilterState(newFilters: Partial<Filters>) {
    Object.assign(filterState, newFilters);
  }
  function updateBeerState(newBeerMeta: Partial<BeerMeta>) {
    if (!filterState.selectedBeerId) return;
    Object.assign(beerMeta.value[filterState.selectedBeerId], newBeerMeta);
  }

  const visibleBeers = computed<BeerWithMeta[]>(() => {
    // append metadata to each beer
    const beersWithMeta = beers.map(beer => ({
      ...beer,
      meta: beerMeta.value[beer.id] || {},
    }));

    // turns off all filters
    if (filterState.disableFilters) {
      return beersWithMeta.sort((a, b) => {
        if (filterState.sortField === "table")
          return (a.table || 0) - (b.table || 0);
        else if (filterState.sortField === "untappdScore") {
          return b.untappdScore - a.untappdScore;
        } else if (filterState.sortField === "abv") {
          return (b.abv || 0) - (a.abv || 0);
        } else if (filterState.sortField === "ibu") {
          return (b.ibu || 0) - (a.ibu || 0);
        }
        return (
          (b.meta[filterState.sortField] || 0) -
          (a.meta[filterState.sortField] || 0)
        );
      });
    }

    return (
      beersWithMeta
        // remove no longer relevant
        .filter(beer => !beer.meta?.ranOut && !beer.meta?.triedAt)
        // specific substyle check
        .filter(beer => {
          if (filterState.substylesSelected.length === 0) return true;
          if (beer.substyle === null) return false;
          return filterState.substylesSelected.includes(beer.substyle);
        })
        // specific style check
        .filter(beer => {
          if (filterState.stylesSelected.length === 0) return true;
          return filterState.stylesSelected.includes(beer.style);
        })
        // style removal check
        .filter(beer => {
          if (filterState.stylesOmitted.length === 0) return true;
          return !filterState.stylesOmitted.includes(beer.style);
        })
        // brewery check
        .filter(beer => {
          if (filterState.breweriesSelected.length === 0) return true;
          return filterState.breweriesSelected.includes(beer.breweryName);
        })
        // floor check
        .filter(beer => {
          if (filterState.floorSelected === null) return true;
          if (beer.table === null) return false;
          const floorRanges = [
            [1, 12],
            [13, 38],
            [39, 50],
            [51, 62],
          ];
          const range = floorRanges[filterState.floorSelected - 1];
          return beer.table >= range[0] && beer.table <= range[1];
        })
        // vip check
        .filter(beer => {
          switch (filterState.showVip) {
            case "all":
              return true;
            case "vip":
              return beer.isVip;
            case "novip":
              return !beer.isVip;
          }
        })
        // sort by selected score
        .sort((a, b) => {
          if (filterState.sortField === "table")
            return (a.table || 0) - (b.table || 0);
          else if (filterState.sortField === "untappdScore") {
            return b.untappdScore - a.untappdScore;
          } else if (filterState.sortField === "abv") {
            return (b.abv || 0) - (a.abv || 0);
          } else if (filterState.sortField === "ibu") {
            return (b.ibu || 0) - (a.ibu || 0);
          }
          return (
            (b.meta[filterState.sortField] || 0) -
            (a.meta[filterState.sortField] || 0)
          );
        })
    );
  });

  return {
    visibleBeers,
    isSidebarOpen,
    filterState,
    selectedBeer,
    allBeers: beers,
    beerMeta,
    updateFilterState,
    updateBeerState,
  };
}

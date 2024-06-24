import { getName } from "country-list";
import { StoreData } from "../../../../shared/types/system";

function getListOfStoreCountries(data: StoreData[]) {
  const countries = [
    { name: "All", code: "all" },
    ...Array.from(new Set(data.map(store => store.country)))
      .map(country => {
        return {
          name: getName(country) || country,
          code: country,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];
  return countries;
}

export { getListOfStoreCountries };

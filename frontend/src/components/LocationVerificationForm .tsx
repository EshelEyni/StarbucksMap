import { FC, useEffect, useState } from "react";
import { Coords, FullCountryData, StoreData } from "../../../shared/types/system";
import { storeService } from "../services/store.service";

export const LocationVerificationForm: FC = () => {
  const [countries, setCountries] = useState<FullCountryData[]>([]);
  const [stores, setStores] = useState<StoreData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<Coords | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSelectedCountry(value);
  }

  //   useEffect(() => {
  //     if (countries.length > 0) return;
  //     async function getData() {
  //       const res = await storeService.getFullCountryData();
  //       setCountries(res);
  //     }

  //     getData();
  //   }, [countries]);

  //   useEffect(() => {
  //     if (stores.length > 0) return;

  //     async function getData() {
  //       const res = await storeService.query();
  //       setStores(res.stores);
  //     }

  //     getData();
  //   }, [stores]);

  if (!countries) return null;

  return (
    <div className="flex flex-col items-center border-t-2 pt-2">
      <h4 className="color-primary playwrite-nz text-xl font-bold text-center sm:text-2xl mb-4">
        Verify store country
      </h4>

      <p className="color-primary text-md sm:text-lg mb-4">
        Select a country and a store to verify the location of the store on the map.
      </p>

      <div className="flex flex-col items-center gap-2 w-full sm:w-96">
        <label htmlFor="stores-data" className="color-primary font-bold cursor-pointer">
          Select a store
        </label>
        <select
          className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md cursor-pointer"
          name="stores"
          id="stores-data"
          onChange={event => {
            const { value } = event.target;
            const store = stores.find(store => store.name === value);
            const coords = store ? { latitude: store.latitude, longitude: store.longitude } : null;
            if (store) setSelectedStore(coords);
          }}
        >
          {stores.map(store => (
            <option
              key={store.store_id}
              value={store.name}
              className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md"
            >
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center gap-2 w-full sm:w-96">
        <label htmlFor="countries-data" className="color-primary font-bold cursor-pointer">
          Select a country
        </label>
        <select
          className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md cursor-pointer"
          name="countries"
          id="countries-data"
          onChange={handleChange}
          value={selectedCountry}
        >
          {countries.map(country => (
            <option
              key={country.alpha3Code}
              value={country.alpha3Code}
              className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md"
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

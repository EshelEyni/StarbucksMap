import { FC, useEffect, useState } from "react";
import { StoreData } from "../../../shared/types/system";
import { useGetCountryStoreData } from "../hooks/useGetCountryStoreData";
import { Loader } from "./Loader";
import { ErrorMsg } from "./ErrorMsg";
import { StoreModal } from "./StoreModal";

export const LocationVerificationForm: FC = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetCountryStoreData();

  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  function handleCountrySelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSelectedCountryCode(value);
  }

  useEffect(() => {
    if (!isSuccess || !data || !!selectedCountryCode || !!selectedStore) return;
    const { countries, stores } = data;
    setSelectedStore(stores[0]);
    setSelectedCountryCode(countries[0].alpha3Code);
  }, [isSuccess, data, selectedCountryCode, selectedStore]);

  if (isLoading) return <Loader />;
  if (isError && error) return <ErrorMsg error={error} />;

  if (!isSuccess || !data) return null;

  const { countries } = data;

  return (
    <div className="flex flex-col items-center pt-1">
      <h4 className="color-primary playwrite-nz text-xl font-bold text-center sm:text-2xl mb-4">
        Verify store country
      </h4>

      <p className="color-primary text-md sm:text-lg mb-4">
        Select a country and a store to verify the location of the store on the map.
      </p>

      <StoreModal
        stores={data.stores}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
      />

      <div className="flex flex-col items-center gap-2 w-full sm:w-96">
        <label htmlFor="countries-data" className="color-primary font-bold cursor-pointer">
          Select a country
        </label>
        <select
          className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md cursor-pointer"
          name="countries"
          id="countries-data"
          onChange={handleCountrySelectChange}
          value={selectedCountryCode}
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

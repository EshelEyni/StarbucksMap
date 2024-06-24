import { FC, useEffect, useState } from "react";
import { FullCountryData, StoreData } from "../../../shared/types/system";
import { useGetCountryStoreData } from "../hooks/useGetCountryStoreData";
import { Loader } from "./Loader";
import { ErrorMsg } from "./ErrorMsg";
import { StoreModal } from "./StoreModal";
import { Button } from "./Button";
import { useVerifyStoreCountry } from "../hooks/useVerifyStoreCountry";

export const LocationVerificationForm: FC = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetCountryStoreData();

  const [country, setCountry] = useState<FullCountryData | null>(null);
  const [store, setStore] = useState<StoreData | null>(null);
  const { verifyStoreCountry, isPending, msg } = useVerifyStoreCountry();
  function handleCountrySelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!data) return;
    const { value } = event.target;
    const country = data.countries.find(c => c.alpha3Code === value) || null;
    setCountry(country);
  }

  function handleStoreSelect(store: StoreData) {
    setStore(store);
  }

  async function onSubmit() {
    if (!country || !store) return;
    verifyStoreCountry({ country, store });
  }

  useEffect(() => {
    if (!isSuccess || !data) return;
    const { countries, stores } = data;
    if (!store) setStore(stores[0]);
    if (!country) setCountry(countries[0]);
  }, [isSuccess, data, country, store]);

  if (isLoading || isPending) return <Loader />;
  if (isError && error) return <ErrorMsg error={error} />;

  if (!isSuccess || !data) return null;

  const { countries } = data;

  return (
    <div className="flex flex-col items-center gap-2">
      <h4 className="color-primary rajdani-bold text-2xl font-bold text-center mb-2">
        Verify store country
      </h4>

      <p className="color-primary text-sm sm:text-md mb-1">
        Select a country and a store to verify the location of the store on the map.
      </p>

      <StoreModal
        stores={data.stores}
        selectedStore={store}
        handleStoreSelect={handleStoreSelect}
      />

      <div className="flex flex-col items-center gap-2 w-full ">
        <label
          htmlFor="countries-data"
          className="color-primary rajdani-semibold text-xl cursor-pointer"
        >
          Select a country
        </label>
        <select
          className="color-primary w-full p-1 sm:p-2 border border-gray-300 rounded-md shadow-md cursor-pointer"
          name="countries"
          id="countries-data"
          onChange={handleCountrySelectChange}
          defaultValue={country?.name || "Country name"}
        >
          {countries.map(c => (
            <option
              key={c.alpha3Code}
              value={c.alpha3Code}
              className="color-primary w-full p-2 border border-gray-300 rounded-md shadow-md"
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Button onClickFn={onSubmit} disabled={isPending}>
        Submit
      </Button>

      <div className="flex flex-col items-center gap-2 w-full p-2 min-h-11">
        {msg && <p className="color-primary">{msg}</p>}
      </div>
    </div>
  );
};

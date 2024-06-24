import { FC, useState } from "react";
import { CountrySelectBox } from "./components/CountrySelectBox";
import { ErrorMsg } from "./components/ErrorMsg";
import { Loader } from "./components/Loader";
import { Map } from "./components/Map";
import { useGetStoreData } from "./hooks/useGetStoreData";
import { LocationVerificationForm } from "./components/LocationVerificationForm ";

export const App: FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const queryString = selectedCountry === "All" ? "" : `?country=${selectedCountry}`;

  const { countries, stores, centralPoint, zoomLevel, error, isLoading, isSuccess, isError } =
    useGetStoreData(queryString);

  return (
    <div className="text-gray-900 flex flex-col py-2 gap-4 overflow-y-auto">
      <h1 className="color-primary rajdani-bold text-4xl font-bold text-center sm:text-5xl mb-4 px-2">
        StarbucksMap
      </h1>
      {isError && error && <ErrorMsg error={error} />}

      <div className="flex flex-col gap-4 sm:flex-row-reverse sm:justify-center sm:gap-8 overflow-auto">
        <div className="w-full sm:w-96 flex flex-col gap-3 sm:gap-4 items-center px-2">
          {isSuccess && (
            <CountrySelectBox
              countries={countries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          )}

          {isLoading && <Loader />}
          <hr className="w-full border-t-2 rounded-full border-gray-300" />
          <LocationVerificationForm />
        </div>
        <Map stores={stores} centralPoint={centralPoint} zoomLevel={zoomLevel} />
      </div>
    </div>
  );
};

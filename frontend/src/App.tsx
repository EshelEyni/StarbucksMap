import { useState } from "react";
import { CountrySelectBox } from "./components/CountrySelectBox";
import { ErrorMsg } from "./components/ErrorMsg";
import { Loader } from "./components/Loader";
import { Map } from "./components/Map";
import { useGetStoreData } from "./hooks/useGetStoreData";
import { LocationVerificationForm } from "./components/LocationVerificationForm ";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const queryString = selectedCountry === "All" ? "" : `?country=${selectedCountry}`;

  const { countries, stores, centralPoint, zoomLevel, error, isLoading, isSuccess, isError } =
    useGetStoreData(queryString);

  return (
    <div className="text-gray-900 flex flex-col sm:p-2 gap-4">
      <h1 className="color-primary playwrite-nz text-4xl font-bold text-center sm:text-5xl mb-4">
        StarbucksMap
      </h1>
      {isError && error && <ErrorMsg error={error} />}

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        <Map stores={stores} centralPoint={centralPoint} zoomLevel={zoomLevel} />

        <div className="w-full sm:w-96 flex flex-col gap-4 justify-center items-center">
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
      </div>
    </div>
  );
}

export default App;

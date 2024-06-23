import { useState } from "react";
import { CountrySelectBox } from "./components/CountrySelectBox";
import { ErrorMsg } from "./components/ErrorMsg";
import { Loader } from "./components/Loader";
import { Map } from "./components/Map";
import { useGetStoreData } from "./hooks/useGetStoreData";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const queryString =
    selectedCountry === "All" ? "" : `?country=${selectedCountry}`;

  const { countries, stores, error, isLoading, isSuccess, isError } =
    useGetStoreData(queryString);

  return (
    <div className="text-gray-900 flex flex-col sm:p-2 gap-4">
      <h1 className="app-title text-4xl font-bold text-center sm:text-5xl mb-4">
        StarbucksMap
      </h1>
      {isError && error && <ErrorMsg error={error} />}
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <Map locations={stores} />
          <CountrySelectBox
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
      )}
    </div>
  );
}

export default App;

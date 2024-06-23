import "./App.css";
import { ErrorMsg } from "./components/ErrorMsg";
import { Loader } from "./components/Loader";
import { Map } from "./components/Map";
import { useGetLocation } from "./hooks/useGetLocation";

function App() {
  const { error, isLoading, isSuccess, isError } = useGetLocation();

  return (
    <div className="text-gray-900 flex flex-col sm:p-2 gap-4">
      <h1 className="app-title text-4xl font-bold text-center sm:text-5xl mb-4">
        StarbucksMap
      </h1>

      {isError && error && <ErrorMsg error={error} />}
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <Map />
        </>
      )}
    </div>
  );
}

export default App;

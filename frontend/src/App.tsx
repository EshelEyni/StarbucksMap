import "./App.css";
import { Map } from "./components/Map";

function App() {
  return (
    <div className="text-gray-900 flex flex-col sm:p-2 gap-4">
      <h1 className="app-title text-4xl font-bold text-center sm:text-5xl mb-4">
        StarbucksMap
      </h1>
      <Map />
    </div>
  );
}

export default App;

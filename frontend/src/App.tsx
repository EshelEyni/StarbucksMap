import "./App.css";
import { Map } from "./components/Map";

function App() {
  console.log(import.meta.env);
  return (
    <div className="text-gray-900">
      <Map />
    </div>
  );
}

export default App;

import "./App.css";
import Landpage from "./components/Landpage/Landpage.js";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landpage />} />
      </Routes>
    </div>
  );
}

export default App;

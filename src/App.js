import "./App.css";
import Landpage from "./landpage/Landpage.component.jsx";
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

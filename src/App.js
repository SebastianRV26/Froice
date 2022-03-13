import "./App.css";
import Landpage from "./components/Landpage/Landpage.js";
import { Route, Routes } from "react-router-dom";
import OpinionsView from "./components/Opinions/OpinionsView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OpinionsView />} />
        <Route path="/" element={<Landpage />} />
      </Routes>
    </div>
  );
}

export default App;

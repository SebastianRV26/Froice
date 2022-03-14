import "./App.css";
import Landpage from "./layouts/Landpage/Landpage.js";
import { Route, Routes } from "react-router-dom";
import OpinionsView from "./layouts/Opinions/OpinionsView";
import Login from "./layouts/login/Login.js"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<OpinionsView />} />
      </Routes>
    </div>
  );
}

export default App;

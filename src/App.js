import "./App.css";
import Landpage from "./layouts/Landpage/Landpage.js";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/Login/Login.jsx"
import Register from './layouts/Register/Register.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Landpage from "./layouts/Landpage/Landpage";
import Login from "./layouts/Login/Login.jsx"
import Register from './layouts/Register/Register.jsx';
import RegisterConfirmation from './layouts/RegisterConfirmation/RegisterConfirmation'
import UnauthenticatedRoute from './components/Routes/UnauthenticatedRoute';
import Dashboard from './layouts/Dashboard/Dashboard';
import ForgotPassword from './layouts/ForgotPassword/ForgotPassword';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UnauthenticatedRoute component={Landpage} /> } />
        <Route path="/login" element={<UnauthenticatedRoute component={Login} />} />
        <Route path="/register" element={<UnauthenticatedRoute component={Register} />} />
        <Route path="/registerConfirmation" element={<UnauthenticatedRoute component={RegisterConfirmation} />} />
        <Route path="/forgot" element={<UnauthenticatedRoute component={ForgotPassword} />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;

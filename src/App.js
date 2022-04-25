import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminView from "./layouts/Admin/AdminView";
import Users from "./layouts/Users/Users";
import Reports from "./layouts/Reports/Reports";
import Landpage from "./layouts/Landpage/Landpage";
import Login from "./layouts/Login/Login";
import Register from "./layouts/Register/Register";
import RegisterConfirmation from "./layouts/RegisterConfirmation/RegisterConfirmation";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import Dashboard from "./layouts/Dashboard/Dashboard";
import ForgotPassword from "./layouts/ForgotPassword/ForgotPassword";
import UsersReports from "./layouts/UserReports/UsersReports";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<UnauthenticatedRoute component={Landpage} />}
        />
        <Route
          path="/login"
          element={<UnauthenticatedRoute component={Login} />}
        />
        <Route
          path="/register"
          element={<UnauthenticatedRoute component={Register} />}
        />
        <Route
          path="/registerConfirmation"
          element={<UnauthenticatedRoute component={RegisterConfirmation} />}
        />
        <Route
          path="/forgot"
          element={<UnauthenticatedRoute component={ForgotPassword} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<UsersReports />} />
        <Route path="/admin" element={<AdminView />}>
          <Route index element={<Users />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          {/* <Route path="profile" element={<Login />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<Products />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

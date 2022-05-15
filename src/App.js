import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./layouts/Login/Login";
import AdminPage from "./layouts/admin/AdminView";
import Landpage from "./layouts/Landpage/Landpage";
import Register from "./layouts/Register/Register";
import RegisterConfirmation from "./layouts/RegisterConfirmation/RegisterConfirmation";
import UnauthenticatedRoute from "./components/Routes/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import Dashboard from "./layouts/Dashboard/Dashboard";
import ForgotPassword from "./layouts/ForgotPassword/ForgotPassword";
import OpinionsView from "./layouts/Opinions/OpinionsView";
import UsersReports from "./layouts/UserReports/UsersReports";
import AboutPage from "./layouts/About/AboutPage";
import Users from "./layouts/Users/Users";
import Reports from "./layouts/Reports/Reports";
import SelectTags from "./layouts/SelectTags/SelectTags";
import UsersE from './layouts/Users/UsersEdit';

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
        <Route
          path="/about"
          element={<AboutPage />}
        />
        {/*<Route path="/dashboard" element={<Dashboard />} />*/}
        <Route
          path="/dashboard"
          element={<OpinionsView />}
        //element={<AuthenticatedRoute component={OpinionsView} />}
        />
        <Route path="/tags" element={<SelectTags />} />
        <Route path="/reports" element={<UsersReports />} />
        <Route path="/usersE" element={<UsersE/>} />
        <Route
          path="/admin"
          element={
            <AuthenticatedRoute requieredRole={"admin"} component={AdminPage} />
          }
        >
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

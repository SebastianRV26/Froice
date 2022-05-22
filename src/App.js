import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./layouts/Login/Login";
import AdminPage from "./layouts/Admin/AdminView";
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
import UsersEdit from "./layouts/Users/UsersEdit";

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
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute requieredRole={"both"} component={Dashboard} />
          }
        >
          <Route index element={<Navigate to="opinions" replace />} />
          <Route path="opinions" element={<OpinionsView type="home" />} />
          <Route
            path="opinions/users/:userId"
            element={<OpinionsView type="profile" />}
          />
          <Route
            path="opinions/comments/:parentId"
            element={<OpinionsView type="comments" />}
          />
          <Route path="explore" element={<OpinionsView type="explore" />} />
          <Route path="reports" element={<UsersReports />} />
          <Route path="profile" element={<UsersEdit />} />
        </Route>
        <Route path="/tags" element={<SelectTags />} />
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

import "./App.css";
import Landpage from "./layouts/Landpage/Landpage.js";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/Login/Login.js";
import AdminView from "./layouts/admin/AdminView";
import Users from "./layouts/Users/Users";
import Reports from "./layouts/Reports/Reports";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/login" element={<Login />} />
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

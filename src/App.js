import "./App.css";
import Landpage from "./layouts/Landpage/Landpage.js";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/login/Login.js";
import AdminView from "./layouts/admin/AdminView"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="admin" element={<AdminView></AdminView>}>
          <Route index element={<p>Profile</p>} />
          {/* <Route path="profile" element={<Login />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<Products />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

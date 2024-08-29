import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import TanentHome from "./Pages/Tenant/TanentHome";
import AllUsers from "./Pages/Admin/AllUsers";
import AllBills from "./Pages/Admin/AllBills";
import UserDetails from "./Pages/Admin/UserDetails";
import TanentBill from "./Pages/Tenant/TanentBill";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/allUsers" element={<AllUsers />} />
        <Route path="/userDetails/:id" element={<UserDetails />} />
        <Route path="/allBills" element={<AllBills />} />


          {/* Tanent */}
          <Route path="/tenant" element={<TanentHome />} />
          <Route path="/bills" element={<TanentBill />} />

      </Routes>
    </>
  );
}

export default App;

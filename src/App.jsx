import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PosLayout from "./layouts/PosLayout";
import Dashboard from "./pages/Dashboard";
import PosMainPage from "./pages/PosMainPage";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<PosLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mainpage" element={<PosMainPage />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
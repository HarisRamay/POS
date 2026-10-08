import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PosMainPage from "./components/PosMainPage";

export default function App() {

  return (

    <Routes>
      <Route
        path="/"
        element={<SignIn />} />
      <Route
        path="/signup"
        element={<SignUp />} />
        <Route
        path="/mainpage"
        element={<PosMainPage/>} />


    </Routes>



  );
}
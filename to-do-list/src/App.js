import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import Toast from "./components/Toast";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
function App() {
  const {validationErr}=useContext(UserContext);
  return (
    <div className="App bg-slate-900	min-h-screen py-10">
      {
        validationErr.email||validationErr.password?
        <Toast msg={validationErr.email?validationErr.email:validationErr.password}></Toast>:
        <></>
      }
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/register" element={<Register></Register>} />
      </Routes>
    </div>
  );
}

export default App;

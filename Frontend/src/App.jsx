import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignUp from "./pages/UserSignUp"
import CaptionLogin from "./pages/CaptionLogin"
import CaptionSignUp from "./pages/CaptionSignUp"
import { UserDataContext } from "./context/userContext";
// Importing the necessary components for routing;
const App = () => {
  const nn = useContext(UserDataContext);
  console.log(nn);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/caption-login" element={<CaptionLogin />} />
        <Route path="/caption-signup" element={<CaptionSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
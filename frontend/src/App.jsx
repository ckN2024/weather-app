import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Verify from "./screens/Verify";
import { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp setEmail={setEmail} setPassword={setPassword}/>} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/verify" element={<Verify email={email} password={password}/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

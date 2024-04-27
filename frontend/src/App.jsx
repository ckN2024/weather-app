import {
  BrowserRouter,
  Link,
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp setEmail={setEmail} />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/verify" element={<Verify email={email}/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

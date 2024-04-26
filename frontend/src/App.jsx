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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/verify" element={<Verify />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

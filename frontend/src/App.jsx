import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

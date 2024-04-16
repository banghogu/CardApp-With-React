import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Card from "./pages/Card";
import ScrollToTop from "./components/shared/ScrollToTop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/test" Component={Test} />
        <Route path="/card/:id" Component={Card} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

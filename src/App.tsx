import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Card from "./pages/Card";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/test" Component={Test} />
        <Route path="/card/:id" Component={Card} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

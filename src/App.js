import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Audiogram from "./components/Audiogram";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/audiogram" element={<Audiogram />}></Route>
      </Routes>
    </div>
  );
}

export default App;

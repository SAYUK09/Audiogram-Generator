import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Video from "./components/Video";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/video" element={<Video />}></Route>
      </Routes>
    </div>
  );
}

export default App;

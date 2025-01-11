import Navbar from "./common/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Block from "./pages/Block";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="pt-16">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/block" element={<Block />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

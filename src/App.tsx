import Navbar from "./common/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Block from "./pages/Block";
import Blockchain from "./pages/Blockchain.tsx";
import NotFound from "./pages/NotFound";
import Distributed from "./pages/Distributed.tsx";

function App() {
  return (
    <BrowserRouter basename="/blockchain-learning-tools">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="pt-16">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/block" element={<Block />} />
            <Route
              path="/blockchain"
              element={<Blockchain name="Block Chain" />}
            />
            <Route path="/distributed" element={<Distributed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DasboardAdmin from "./pages/DasboardAdmin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DasboardAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

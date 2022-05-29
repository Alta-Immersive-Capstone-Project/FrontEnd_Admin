import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DasboardAdmin from "./pages/DasboardAdmin";
import ListPengajuan from "./pages/ListPengajuan";
import MakeOffering from "./pages/MakeOffering";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DasboardAdmin />} />
          <Route path="/listPengajuan" element={<ListPengajuan />} />
          <Route path="/makeOffering" element={<MakeOffering />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

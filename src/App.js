import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DasboardAdmin from "./pages/DasboardAdmin";
import ListPengajuan from "./pages/ListPengajuan";
import MakeOffering from "./pages/MakeOffering";
import RiwayatKosan from "./pages/RiwayatKosan";
import ManageKota from "./pages/ManageKota";
import ListKosan from "./pages/ListKosan.jsx";
import InputKosan from "./pages/InputKosan.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";

function Testing() {
  return (
    <div>
      <div className="d-flex flex">
        <div>
          <Sidebar />
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ flex: "1" }}
        >
          <div
            style={{
              width: "100%",
              margin: " 30px 70px 100px",
            }}
          >
            <Routes>
              <Route path="/dashboard" element={<DasboardAdmin />} />
              <Route path="/listPengajuan" element={<ListPengajuan />} />
              <Route path="/makeOffering" element={<MakeOffering />} />
              <Route path="/riwayatKosan" element={<RiwayatKosan />} />
              <Route path="/listkosan" element={<ListKosan />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inputkosan" element={<InputKosan />} />
          <Route path="*" element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

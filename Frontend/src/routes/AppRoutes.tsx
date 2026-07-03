import { Routes, Route } from "react-router-dom";

import Home from "../pages/Lista";
import Registrar from "../pages/Registro";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registrar" element={<Registrar />} />
    </Routes>
  );
}
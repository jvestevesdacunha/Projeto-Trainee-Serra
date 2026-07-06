import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/auth" element={<AuthenticationPage />} />
            </Routes>
        </BrowserRouter>
    )
}
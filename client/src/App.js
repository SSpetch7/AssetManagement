import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

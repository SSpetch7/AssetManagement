import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "components/RootLayout";
import Home from "pages/home";
import Management from "pages/management";
import Dashboard from "pages/dashboard";
import History from "pages/borrowHistory";
import Borrower from "pages/borrower";
import Admin from "pages/admin";

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/management/:ID" element={<Management />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/borrowHistory" element={<History />} />
            <Route path="/borrower" element={<Borrower />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </RootLayout>
      </Router>
    </div>
  );
}

export default App;

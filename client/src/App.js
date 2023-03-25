import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "components/RootLayout";
import Home from "pages/home";
import Management from "pages/management";
import Dashboard from "pages/dashboard";
import History from "pages/borrowHistory";
import Borrower from "pages/borrower";
import Admin from "pages/admin";
import { Tooltip } from '@mui/material';
import { Navbar, Sidebar} from './components';
import { useStateContext } from "contexts/ContextProvider";

function App() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  return (
    <div className="w-full min-h-screen bg-white">
      <Router>
      <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <Tooltip
              title="Settings"
              position="Top"
            >
              

            </Tooltip>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Admin />)} />
                <Route path="/ecommerce" element={(<Admin />)} />

                {/* pages  */}
                <Route path="/orders" element={<Admin />} />
                <Route path="/employees" element={<Admin />} />
                <Route path="/customers" element={<Admin />} />

                {/* apps  */}
                <Route path="/kanban" element={<Admin />} />
                <Route path="/editor" element={<Admin />} />
                <Route path="/calendar" element={<Admin />} />
                <Route path="/color-picker" element={<Admin />} />

                {/* charts  */}
                <Route path="/line" element={<Admin />} />
                <Route path="/area" element={<Admin />} />
                <Route path="/bar" element={<Admin />} />
                <Route path="/pie" element={<Admin />} />
                <Route path="/financial" element={<Admin />} />
                <Route path="/color-mapping" element={<Admin />} />
                <Route path="/pyramid" element={<Admin />} />
                <Route path="/stacked" element={<Admin />} />

              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from './pages/Dashboard';
import Patient from './pages/Patient';
import Reports from './pages/Reports';
import Form from './components/Form'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [showSidebarAndTopbar, setShowSidebarAndTopbar] = useState(true);

  return (
    <Router>
      <div className="flex">
        {showSidebarAndTopbar && (
          <>
            <Sidebar />
            <Topbar />
            <div className="ml-[18%] mt-[70px] w-full">
              <Routes>
                {/* Default Route Redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Individual Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/patients" element={<Patient />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/Form" element={<Form />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

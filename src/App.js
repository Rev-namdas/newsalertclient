import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Dashboard from "./components/dashboard/Dashboard";
import EachAlertDetails from "./components/alerts/EachAlertDetails";
import AlertList from "./components/alerts/AlertList";

function App() {
    return <div>
        <Router>
            <Routes>
                <Route path="/"  element={<Login />} />
                <Route path="/register"  element={<Register />} />
                <Route path="/dashboard"  element={<Dashboard />} />
                <Route path="/dashboard/list"  element={<AlertList />} />
                <Route path="/alert/:alertname"  element={<EachAlertDetails />} />
            </Routes>
        </Router>
    </div>;
}

export default App;

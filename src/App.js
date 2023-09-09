import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
import Home from "./Components/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home/:id" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

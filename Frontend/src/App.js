import logo from './logo.svg';
import './App.css';
import './components/layout/header/header'
import Header from "./components/layout/header/header";
import SignIn from "./pages/sign-in-page/SignIn"
import SignUp from "./pages/sign-up-page/SignUp";
import Home from "./pages/home-page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />

        </Routes>
      </Router>
);
}

export default App;

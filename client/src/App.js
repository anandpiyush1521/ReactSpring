import './App.css';
import { BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import UserHome from './pages/Users/UserHome';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/home" element={<UserHome />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

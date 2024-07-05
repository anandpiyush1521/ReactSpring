import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import UserHome from './pages/Users/UserHome';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import UserAddBlog from './pages/Users/UserAddBlog';

function App() {
  const user = localStorage.getItem('user');

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <UserHome /> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user/home" element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          } />
          <Route path="/user/add-blog" element={
            <ProtectedRoute>
              <UserAddBlog />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Import the Footer component
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
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
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
        </div>
        <Footer />  {/* Add the Footer component */}
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

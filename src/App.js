import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Tatlilar from "./pages/Tatlilar";
import Icecekler from "./pages/Icecekler";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/icecekler" element={<Icecekler/>}/>
          <Route path="/tatlilar" element={<Tatlilar/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;

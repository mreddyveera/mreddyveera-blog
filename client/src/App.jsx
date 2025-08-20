import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Projects from "./pages/Projects.jsx";
import About from "./pages/About.jsx";
import Header from './components/Header.jsx';
function App() {
  
  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

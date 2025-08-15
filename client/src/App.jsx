import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from "./pages/Dashboard.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Projects from "./pages/Projects.jsx";
function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="projects" elememt={<Projects />}/>
        <Route path="signin" elements={<Signin/>}/>
        <Route path="signup" elements={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

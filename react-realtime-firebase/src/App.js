import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import About from "./pages/about";
import Login from "./components/login";
import SignUp from "./components/signup";
import Form from "./components/form";
import Detail from "./pages/detail";
import Footer from "./components/footer";

function App() {

  const [pathname, setPathname] = useState(null);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const uid = localStorage.getItem('auth');
  var detailUrl = `/detail/:${uid}`;
  console.log(detailUrl);
  return (
    <Router>
      <div className="appjs">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/form" element={<Form />} />
          <Route path="/detail/:uid" element={<Detail />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
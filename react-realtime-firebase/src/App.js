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
import Edit from "./pages/edit";
import Logout from "./components/logout";
import EditPost from "./pages/editpost";
import Insert from "./pages/insert";
import EditUser from "./pages/edituser";

function App() {

  const [pathname, setPathname] = useState(null);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const uid = localStorage.getItem('auth');
  const postID = localStorage.getItem('postUID')
  const userID = localStorage.getItem('userUID')
  var editpostUrl = `/editpost/:${postID}`
  var edituserUrl = `/edituser/:${userID}`
  var detailUrl = `/detail/:${uid}`;
  console.log(editpostUrl);
  console.log(edituserUrl)
  console.log(detailUrl);
  console.log(uid)
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
          <Route path="/edit/:uid" element={<Edit />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/editpost/:id" element={<EditPost />}/>
          <Route path="/insert" element={<Insert />}/>
          <Route path="/edituser/:id" element={<EditUser/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
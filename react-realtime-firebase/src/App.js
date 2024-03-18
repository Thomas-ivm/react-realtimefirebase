import logo from './logo.svg';
import './App.css';
import { Auth } from './components/signup';
import Navbar from './components/navbar';
import Home from './pages/Home'
import About from './pages/about';
import Login from './components/login';
import { Form } from './components/form';
import Detail from './pages/detail'

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break;
    case "/about":
      component = <About />
      break;
    case "/login":
      component = <Login />
      break;
    case "/signup":
      component = <Auth />
      break;
    case "/form":
      component = <Form />
      break;
    case "/detail":
      component = <Detail />
      break;
  }
  return (
    <div className='appjs'>
      <Navbar />
      {component}
    </div>
  );
}

export default App;

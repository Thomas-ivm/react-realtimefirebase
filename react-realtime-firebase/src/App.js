import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import Navbar from './components/navbar';
import Home from './pages/Home'
import About from './pages/about';

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break;
    case "/about":
      component = <About />
      break;
  }
  return (
    <div className='main'>
      <Navbar />
      {component}
    </div>
  );
}

export default App;

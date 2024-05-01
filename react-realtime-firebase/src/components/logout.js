import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Logout = () => {
    const navigate = useNavigate();

    try {
        // Using Firebase function to sign out the user
         signOut(auth);
        localStorage.setItem('auth', '');
        // setTimeout(function(){
          navigate('/');
          window.location.reload();
      //  }, 2500);
      } catch (err) {
        // Handling errors, if any
        console.error(err.message);
      }
}

export default Logout
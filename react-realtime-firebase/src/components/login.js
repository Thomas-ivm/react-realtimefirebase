import React, { useState } from "react";
import '../App.css';
import { auth, googleProvider } from "../config/firebase"; // Importing Firebase authentication configuration
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // Importing Firebase authentication functions
import { useNavigate } from "react-router-dom";

// Functional component for handling user login
const Login = () => {
  // State variables for storing user input
  const [email, setEmail] = useState(""); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password
  const navigate = useNavigate();

  // Function to update state with entered email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to update state with entered password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle user sign in with email and password
  const handleSignIn = async () => {
    try {
      // Using Firebase function to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert('welkom ' + auth?.currentUser?.uid)
      navigate('/')
      localStorage.setItem('auth', auth?.currentUser?.uid);
      window.location.reload();
    } catch (err) {
      // Handling errors, if any
      console.error(err.code, err.message);
      console.log('gegevens zijn niet juist')
      alert('gegevens zijn niet juist')
    }
  };

  // Function to handle user sign in with Google
  const handleSignInWithGoogle = async () => {
    try {
      // Using Firebase function to sign in with Google using a popup
      await signInWithPopup(auth, googleProvider);
      alert('welkom ' + auth?.currentUser?.email);
      localStorage.setItem('auth', auth?.currentUser?.uid);
      navigate('/')
      window.location.reload();
    } catch (err) {
      // Handling errors, if any
      console.error(err.message);
    }
  };

  // Function to handle user sign out
  // const handleSignOut = async () => {
  //   try {
  //     // Using Firebase function to sign out the user
  //     await signOut(auth);
  //     localStorage.setItem('auth', '');
  //     // setTimeout(function(){
  //       navigate('/');
  //   //     window.location.reload();
  //   //  }, 2500);
  //   } catch (err) {
  //     // Handling errors, if any
  //     console.error(err.message);
  //   }
  // };

  // Rendering the login form
  return (
    <div className="logincomponent">
      <h2>Login</h2>
      <div className="loginInputField">
        <div>
          {/* Input field for email */}
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          {/* Input field for password */}
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
      </div>
      <div className="loginbtn">
        {/* Button to sign in with email and password */}
        <button onClick={handleSignIn}>Sign In</button>
        {/* Button to sign in with Google */}
        <button className="logInGoogle" onClick={handleSignInWithGoogle}>Sign In with Google</button>
        {/* Button to sign out */}
        {/* <button onClick={handleSignOut}>Logout</button> */}
      </div>
      <div className="login">
        <p>Nog geen account?</p>
        <a href="/signup" className="toSignUp">signup</a>
      </div>
    </div>
  );
};

export default Login;

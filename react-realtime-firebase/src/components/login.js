import React, { useState } from "react";
import '../App.css';
import { auth, googleProvider } from "../config/firebase"; // Importing Firebase authentication configuration
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"; // Importing Firebase authentication functions

// Functional component for handling user login
const Login = () => {
  // State variables for storing user input
  const [email, setEmail] = useState(""); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password

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
      alert('welkom ' + auth?.currentUser?.email)
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
      alert('welkom ' + auth?.currentUser?.email)
    } catch (err) {
      // Handling errors, if any
      console.error(err.message);
    }
  };

  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      // Using Firebase function to sign out the user
      await signOut(auth);
    } catch (err) {
      // Handling errors, if any
      console.error(err.message);
    }
  };

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
      <div>
        {/* Button to sign in with email and password */}
        <button onClick={handleSignIn}>Sign In</button>
        {/* Button to sign in with Google */}
        <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
        {/* Button to sign out */}
        <button onClick={handleSignOut}>Logout</button>
      </div>
      <div className="login">
        <p>Nog geen account?</p>
        <a href="/signup" className="loginbtn">signup</a>
      </div>
    </div>
  );
};

export default Login;

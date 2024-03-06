import React, { useState } from "react";
import { auth, googleprovider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={handleEmailChange} />
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};

export default Login;

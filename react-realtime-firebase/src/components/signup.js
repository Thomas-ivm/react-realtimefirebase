import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Auth = () => {
    // State variables for storing user input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("")

    //signup using email and password
    const signup = async () => {
        if (password === confirmPassword) {
            try {
                //using firebase to signup with email and password
                await createUserWithEmailAndPassword(auth, email, password);
                Navigate('./Home')

            } catch (err) {
                //handeling error
                console.error(err);
            }
        } else {
            alert('wachtwoord is niet het zelfde')
        }
    };

    //signup using google
    const signupWithGoogle = async () => {
        try {
            //using firebase to signup with google
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            //handeling error
            console.error(err);
        }
    };

    return (
        //Rendering the form
        <div>
            <input placeholder="Email..." type="email" required onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password..." type="password" required onChange={(e) => setPassword(e.target.value)} />
            <input placeholder="Confirm Password..." required type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
            <input placeholder="Name..." type="text" onChange={(e) => setName(e.target.value)} />
            <button onClick={signup}> Sign up</button>
            <button onClick={signupWithGoogle}>Sign up with Goolge</button>
        </div>
    )
}
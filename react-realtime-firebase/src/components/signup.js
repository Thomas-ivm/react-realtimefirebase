import { auth, googleprovider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

    console.log(auth?.currentUser?.email);

    const signup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err);
        }
    };

    const signupWithGoogle = async () => {
        try {
            await signInWithPopup( auth, googleprovider)
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <input placeholder="Email..." type="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
            <input placeholder="Name..." type="text" onChange={(e) => setName(e.target.value)} />
            <button onClick={signup}> Sign up</button>
            <button onClick={signupWithGoogle}>Sign up with Goolge</button>
        </div>
    )
}
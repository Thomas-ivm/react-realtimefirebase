import { auth, googleprovider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const singin = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err);
        }
    };

    const signinWithGoogle = async () => {
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
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={singin}> Sign in</button>
            <button onClick={signinWithGoogle}>Sign in with Goolge</button>
            <button onClick={logout}> Logout </button>
        </div>
    )
}
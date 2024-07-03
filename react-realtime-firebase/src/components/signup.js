import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const db = getFirestore();
const role = 'reader';
function SignUp() {
    const navigate = useNavigate();
    // State variables for storing user input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [bday, setBday] = useState("");
    //signup using email and password
    const signup = async () => {
        if (password === confirmPassword) {
            try {
                //using firebase to signup with email and password
                await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", auth?.currentUser?.uid), {
                    fname,
                    lname,
                    email,
                    role,
                    bday
                });
                navigate('/')

            } catch (err) {
                //handeling error
                console.error(err);
                alert('uhm dat ging niet goed')
            }
        } else {
            alert('wachtwoord is niet het zelfde')
        }
    };

    const backToLogin = async () => {
        navigate('/login')
    }

    //signup using google
    const signupWithGoogle = async () => {
        try {
            //using firebase to signup with google
            await signInWithPopup(auth, googleProvider)
            await setDoc(doc(db, "users", auth?.currentUser?.uid), {
                fname,
                lname,
                email,
                role,
                bday
            });
            navigate('/')

        } catch (err) {
            //handeling error
            console.error(err);
        }
    };

    return (
        //Rendering the form
        <div className="signUpComponent">
            <h1>Sign Up</h1>
            <div className="signUpFormInputFields">
                <input placeholder="Email...*" type="email" required onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password...*" type="password" required onChange={(e) => setPassword(e.target.value)} />
                <input placeholder="Confirm Password...*" required type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <input placeholder="First name...*" type="text" required onChange={(e) => setFname(e.target.value)} />
                <input placeholder="Last name...*" type="text" required onChange={(e) => setLname(e.target.value)} />
                <label>birthday</label>
                <input type="date" required onChange={(e) => setBday(e.target.value)}/>
            </div>
            <div className="signUpFormButton">
                <button onClick={signup}> Sign up</button>
                <button onClick={signupWithGoogle}>Sign up with Goolge</button>
            </div>
                <button onClick={backToLogin}>terug</button>
        </div>
    )
}

export default SignUp;
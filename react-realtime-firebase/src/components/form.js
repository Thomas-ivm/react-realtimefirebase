import { useState } from "react"
import moment from "moment";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const Form = () => {
    //state variables for storing user input
    const [title, setTitle] = useState("");
    const [bericht, setBericht] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore(); // Access Firestore instance
        const timestamp = moment().format();
        try {
            await addDoc(collection(db, "posts"), {
                title,
                bericht,
                timestamp,
            });
            // Navigate('./Detail')
            alert('het is gelukt');
            setTitle("");
            setBericht("")
        } catch (error) {
            alert('het is niet goed gegaan');
            console.log(error.message);
        }

        setTitle();

    };

    return (
        <div className="formComponent">
            <h1>Form</h1>

            <form className="formAll" onSubmit={handleSubmit}>
                <input required placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Bericht" value={bericht} onChange={(e) => setBericht(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
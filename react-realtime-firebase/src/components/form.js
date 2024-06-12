import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUID");
  const writerUid = localStorage.getItem("auth");
  //state variables for storing user input
  const [title, setTitle] = useState("");
  const [bericht, setBericht] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(); // Access Firestore instance

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth();
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();

    if (ss < 10) ss = "0" + ss;
    if (min < 10) min = "0" + min;
    if (hh < 10) hh = "0" + hh;
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const timestamp =
      hh + ":" + min + ":" + ss + " " + dd + "/" + mm + "/" + yyyy;

    try {
      await addDoc(collection(db, "posts"), {
        title,
        bericht,
        timestamp,
        writerUid,
      });
      // Navigate('./Detail')
      alert("het is gelukt");
      setTitle("");
      setBericht("");
      navigate("/");
    } catch (error) {
      alert("het is niet goed gegaan");
      console.log(error.message);
    }

    setTitle();
  };

  if(currentUser === "writer" || currentUser === "owner"){
    return (
      <div className="formComponent">
        <h1>Form</h1>
        <form className="formAll">
          <input
            required
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Bericht"
            value={bericht}
            onChange={(e) => setBericht(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    )
  } else {
    return (
      <div className="formComponent">acces denied</div>
    )
  }
}

export default Form;

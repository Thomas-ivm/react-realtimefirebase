import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import "../App.css";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Edit() {
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    
    var uid = localStorage.getItem("auth");
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const docRef = doc(db, "users", uid);
      const docSnap = getDoc(docRef);
      docSnap.then((doc) => {
        if (!doc.exists()) {
          console.log("geen gebruikers gegevens");
          return null;
        } else {
          const user = doc.data();
          console.log("Document data:", user);
          setUsers(user);
        }
      });
    }, [uid]);

    const handleEdit = async (e) => {
      e.preventDefault();
      try {
        await updateDoc(collection(db, ""), {
          fname,
          lname
        });
        navigate(`/detail/${uid}`)
      } catch(error) {
        console.log(error.message)
      }
    }

  return (
    <div className="edit">
      <h1>Edit</h1>
      <div className="editinvoer">
        <input required type="text" placeholder={users.fname} onChange={(e) => setFname(e.target.value)} />
        <input required type="text" placeholder={users.lname} onChange={(e) => setLname(e.target.value)}/>
        {/* </div><div className="editinvoer2"> */}
        <input required type="email" placeholder="email" />
        {/* <input placeholder="Voor naam" /> */}
        <button onClick={handleEdit}>Opslaan</button>
      </div>
    </div>
  );
}

export default Edit;

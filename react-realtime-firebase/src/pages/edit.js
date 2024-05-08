import { doc, getDoc, updateDoc} from "firebase/firestore";
import "../App.css";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();

  var uid = localStorage.getItem("auth");
  
  const [users, setUsers] = useState([]);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [role, setRole] = useState("");
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
          setFname(user.fname);
          setLname(user.lname);
          setRole(user.role);
        }
      });
    }, [uid]);

    const handleEdit = async (e) => {
      e.preventDefault();
      try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
          fname,
          lname,
          role
        });
        navigate(`/detail/${uid}`)
      } catch(error) {
        console.log(error.message)
        alert(error.message)
      }
    }

    

  return (
    <div className="edit">
      <h1>Edit</h1>
      <div className="editinvoer">
        <input required type="text" placeholder={users.fname} onChange={(e) => setFname(e.target.value)} />
        <input required type="text" placeholder={users.lname} onChange={(e) => setLname(e.target.value)}/>
        <div>
          <select name="selectRole" value={role}
          onChange={e => setRole(e.target.value)}>
            <option value="reader">Reader</option>
            <option value="writer">Writer</option>
          </select>
        </div>
        <button onClick={handleEdit}>Opslaan</button>
      </div>
    </div>
  );
}

export default Edit;
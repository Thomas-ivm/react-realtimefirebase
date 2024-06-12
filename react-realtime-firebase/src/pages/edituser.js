import "../App.css";
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function EditUser() {
  const navigate = useNavigate();
  const userUID = localStorage.getItem("userUID");
  const currentUser = localStorage.getItem("currentUID");
  console.log(userUID);
  const [users, setUsers] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    const docRef = doc(db, "users", userUID);
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
  }, [userUID]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", userUID);
      await updateDoc(userRef, {
        fname,
        lname,
        role,
      });
      navigate("/");
      localStorage.setItem("userUID", "");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  if (currentUser === "owner") {
    return (
      <div className="edit">
        <h1>Edit</h1>
        <div className="editinvoer">
          {users.email}
          <input
            required
            type="text"
            defaultValue={users.fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            required
            type="text"
            defaultValue={users.lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <div>
            <select
              name="selectRole"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option ption value="reader">
                Reader
              </option>
              <option value="writer">Writer</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button onClick={handleEdit}>Opslaan</button>
        </div>
      </div>
    );
  } else {
    signOut(auth); localStorage.clear(); navigate("/")
  }
}
export default EditUser;

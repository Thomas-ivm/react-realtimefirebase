import { doc as firestoreDoc, getDoc } from "firebase/firestore";
import "../App.css";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";

function Detail() {
  var uid = localStorage.getItem("auth");
  const [users, setUsers] = useState([])

  useEffect(() => {
    const docRef = firestoreDoc(db, "users", uid);
    const docSnap = getDoc(docRef);
    docSnap.then((doc) => {
      if (!doc.exists()) {
        console.log("geen gebruikers gegevens");
        return null;
      } else {
        const user = doc.data();
        console.log("Document data:", user);
        setUsers(user)
      }
    });
  }, [uid]);

  return (
    <div className="detailPage">
      <h1>Your account</h1>
      <div>Email: {uid}</div>
      <div>UID: {uid}</div>
      <div>Naam: {users && users.fname}</div>
      <div>Role: {users && users.role}</div>
      <div></div>
    </div>    
  );
}

export default Detail;
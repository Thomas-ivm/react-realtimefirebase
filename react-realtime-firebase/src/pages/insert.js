import "../App.css";
import { doc as firestoreDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Insert() {
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();
  const uid = localStorage.getItem("auth");
  useEffect(() => {

    const docRef = firestoreDoc(db, "users", uid);
    const docSnap = getDoc(docRef);
    
    docSnap.then((doc) => {
      if (!doc.exists()) {
        console.log("geen gebruikers gegevens");
        return null;
      } else {
        const user = doc.data();
        const getMyData = user;
        console.log("Document data:", user);
        setUsers(user);
        localStorage.setItem("currentUserInfo", JSON.stringify(getMyData));
        navigate("/");
      }
    });
  }, [uid]);

  return null; // or return some JSX if needed
}

export default Insert;

import { doc as firestoreDoc, getDoc } from "firebase/firestore";
import "../App.css";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();

  var uid = localStorage.getItem("auth");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
        setUsers(user);
        setIsLoading(false); // Update de laadstatus
      }
    });
  }, [uid]);

  const toEdit = async () => {
    navigate(`/edit/${uid}`);
  };

  return (
    <div className="detailPage">
      <h1>Your account</h1>
      {isLoading ? (
        <div className="detailinfo">
          <p>Loading data...</p>
        </div>
      ) : (
        <div className="detailinfo">
          <div>Email: {users.email}</div>
          <div>Naam: {users.fname} {users.lname}</div>
          <div>Role: {users.role}</div>
          <div>birthday: {users.bday}</div>
        </div>
      )}
      <button onClick={toEdit}>Edit</button>
    </div>
  );
  
}

export default Detail;

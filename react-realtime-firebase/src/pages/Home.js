import logo from "../logo.svg";
import "../App.css";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const uid = localStorage.getItem("auth");
  const authEmail = localStorage.getItem("authEmail");
  const currentUser = localStorage.getItem("currentUserInfo");

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Haal user en post data op uit Firestore
  useEffect(() => {
    const getUsersAndPosts = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const postsCollectionRef = collection(db, "posts");

        const usersSnapshot = await getDocs(usersCollectionRef);
        const postsSnapshot = await getDocs(postsCollectionRef);

        const usersData = usersSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const postsData = postsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUsers(usersData);
        setPosts(postsData);
      } catch (err) {
        console.error(err);
      }
    };
    getUsersAndPosts();
  }, []);
  console.log(users, posts)
  
 // useEffect to store user and post data in localstorage
useEffect(() => {
  localStorage.setItem("check", 1);
  localStorage.setItem("users", JSON.stringify(users)); // Corrected keys
  localStorage.setItem("posts", JSON.stringify(posts)); // Corrected keys
  }, [users, posts]);
  
  // Zoek de role van de huidige gebruiker in de currentUserInfo array
  if(currentUser !== null){

  }else{
    console.log("er is geen data ")
  }

  // Bepaal of de knop moet worden weergegeven
  // const userRole = localStorage.getItem("currentUserRole");
  const toPostEdit = async () => {
    navigate("/editpost")
  }

  let editPostButton;
  // const writerUid = currentUser;
  if (/*uid === writerUid ||*/ currentUser === "writer" || currentUser === "owner") {
    editPostButton = <button onClick={toPostEdit}>Edit</button>;
  } else {
    editPostButton = null; // Geen knop als de rol niet overeenkomt
  }

  // Ga naar de login pagina als er geen gebruiker is
  const toLogin = async () => {
    navigate("/login");
  };

  let text;
  if ((uid === null) || (uid === "")) {
    text = (
      <div className="homeNotLoggedin">
        "je bent niet ingelogd"
        <button onClick={toLogin}>Login</button>
      </div>
    );
  } else {
    text = (
      <div className="userPosts">
        <p>{authEmail}</p>
        <div className="user">
          {users.map((users) => (
            <div className="info">
              {/* <p>id: {users.userID}</p> */}
              <p>
                Email: <br /> {users.email}
              </p>
              <p>
                Naam: {users.fname} {users.lname}
              </p>
              <p>role: {users.role}</p>
            </div>
          ))}
        </div>
        <div className="posts">
          {posts.map((posts) => (
            <div className="infoposts">
              {/* <p>id: {posts.id}</p> */}
              <p>Title: {posts.title}</p>
              <p>Time: {posts.timestamp}</p>
              <p className="bericht">Bericht: </p>
              <p>{posts.bericht}</p>
              <p>{posts.uid}</p>
              <p>{editPostButton}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{text}</div>
      </header>
    </div>
  );
}

export default Home;
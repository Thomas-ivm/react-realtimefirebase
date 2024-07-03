import logo from "../logo.svg";
import "../App.css";
import {
  getDocs,
  collection,
  doc as firestoreDoc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const uid = localStorage.getItem("auth");
  const authEmail = localStorage.getItem("authEmail");

  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [cUser, setCUser] = useState([]);
  // console.log(cUser)

  useEffect(() => {
    const getCurrentUserInfo = async () => {
      if (uid) {
        const docRef = firestoreDoc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
          const cUser = docSnap.data();
          setCUser(cUser);
          window.localStorage.setItem("currentUserInfo", JSON.stringify(cUser));
          console.log(cUser.role);
          localStorage.setItem("currentUID", cUser.role);
        } else {
          console.log("geen gebruikers gegevens");
        }
      }
    };

    getCurrentUserInfo();
  }, [uid]); // Run useEffect only when uid changes


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
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error(err);
      }
    };
    getUsersAndPosts();
  }, [uid]); // Run useEffect only once after initial render
  console.log(users, posts); // useEffect to store user and post data in localstorage

  useEffect(() => {
    localStorage.setItem("check", 1);
    localStorage.setItem("users", JSON.stringify(users)); // Corrected keys
    localStorage.setItem("posts", JSON.stringify(posts)); // Corrected keys
  }, [users, posts]);

  // Zoek de role van de huidige gebruiker in de currentUserInfo array
  const currentUser = localStorage.getItem("currentUID");
  // const currentUserinfo = JSON.parse(window.localStorage.getItem("currentUserinfo"));
  if (currentUser !== null) {
    console.log("er is data");
  } else {
    console.log("er is geen data");
  }

  let text;
  if (uid === null || uid === "") {
    text = (
      <div className="homeNotLoggedin">
        "je bent niet ingelogd"
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  } else {
    text = (
      <div className="userPosts">
        {currentUser === "owner" ? (
          <p>
            {authEmail} en {uid}
          </p>
        ) : null}
        <div className="user">
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            users &&
            users.map((users) => (
              <div className="info">
                {/* <p>id: {users.userID}</p> */}
                <p>Email: <br /> {users.email}</p>
                <p>Naam: {users.fname} {users.lname}</p>
                {currentUser === "owner" ? (
                  <div>
                  <p>birthday: {users.bday}</p>
                    <p>role: {users.role}</p>
                    <p>UID: {users.id}</p></div>
                ) : null}
                {currentUser === "owner" ? (
                  <button
                    onClick={() => { localStorage.setItem("userUID", users.id); navigate(`/edituser/${users.id}`) }}>Edit</button>
                ) : null}
              </div>
            ))
          )}
        </div>
        <div className="posts">
          {isLoading ? (
            <p>Loading posts...</p>
          ) : (
            posts &&
            posts.map((post) => (
              <div className="infoposts">
                {/* <p>id: {post.id}</p> */}
                <p>Title: {post.title}</p>
                <p>Time: {post.timestamp}</p>
                {post.UTimestamp ? (
                  <p>Updated: {post.UTimestamp}</p>
                ) : null}
                <p className="bericht">Bericht: </p>
                <p>{post.bericht}</p>
                {currentUser === "owner" ? (
                  <div><p>UID of writer {post.writerUid}</p>
                    <p>ID of post {post.id}</p></div>
                ) : null}
                {currentUser === "writer" && uid === post.writerUid ? (
                  <button
                    onClick={() => {
                      localStorage.setItem("postUID", post.id);
                      navigate(`/editpost/${post.id}`);
                    }}
                  >
                    Edit
                  </button>
                ) : currentUser === "owner" ? (
                  <button
                    onClick={() => {
                      localStorage.setItem("postUID", post.id);
                      navigate(`/editpost/${post.id}`);
                    }}
                  >
                    Edit
                  </button>
                ) : null}
              </div>
            ))
          )}
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
        <p>Welkom {cUser.fname}</p>
        <div>{text}</div>
      </header>
    </div>
  );
}

export default Home;
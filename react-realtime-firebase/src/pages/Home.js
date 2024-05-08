import logo from "../logo.svg";
import "../App.css";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const uid = localStorage.getItem('auth');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  // useEffect to store user and post data in localstorage
  useEffect(() => {
    localStorage.setItem("check", 1);
    localStorage.setItem("users", JSON.stringify(users)); // Corrected keys
    localStorage.setItem("posts", JSON.stringify(posts)); // Corrected keys
  }, [users, posts]);

  useEffect(() => {
    var check = localStorage.getItem("check");
    const getUsersAndPosts = async () => {
      if (check >= 1)
        try {
          const usersCollectionRef = collection(db, "users");
          const postsCollectionRef = collection(db, "posts");
          const usersData = await getDocs(usersCollectionRef); // Fetch users separately
          const postsData = await getDocs(postsCollectionRef); // Fetch posts separately
          const usersFilteredData = usersData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const postsFilteredData = postsData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUsers(usersFilteredData);
          setPosts(postsFilteredData);
          check--;
        } catch (err) {
          console.error(err);
          console.log("Log in om de data te zien");
        }
      };
      getUsersAndPosts();
    }, []);
    // const uid = auth?.currentUser?.uid;
    // console.log(uid);

    const toLogin = async () => {
      navigate('/login')
    }

  console.log(users, posts);
    

let editPostButton;

if (users.role === "writer") {
  editPostButton = <button>Edit</button>;
} else if (users.role === undefined) {
  editPostButton = <div>Loading...</div>;
} else {
  editPostButton = null;
}

  let text
    if(uid === null | uid === ""){
      text = 
      <div className="homeNotLoggedin"> "je bent niet ingelogd"
      <button onClick={toLogin}>Login</button></div>
    } else {
      text = 
      <div className="userPosts">
      <div className="user">
      <p>{users.role}</p>
        {users.map((users) => (
          <div className="info">
            {/* <p>id: {users.userID}</p> */}
            <p>Email: <br/> {users.email} </p>
            <p>Naam: {users.fname} {users.lname}</p>
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
            <p>{editPostButton}</p>
          </div>
        ))}
      </div>
    </div> 
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
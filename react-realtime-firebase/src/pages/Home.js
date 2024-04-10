import logo from "../logo.svg";
import "../App.css";
import { getAuth } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";

function Home() {
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

  console.log(users, posts);

  const auth = getAuth();
  let account;
  //check if user is logged in
  if (auth?.currentUser?.email !== null) {
    //user is logged in
    account = auth?.currentUser?.email;
  } else {
    //user is not logged in
    account = "je bent niet ingelogt";
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
        <div className="userPosts">
          <p>Email: {account}</p>
          <p>ID: {auth?.currentUser?.uid}</p>
          <div className="user">
            {users.map((users) => (
              <div className="info">
                <p>id: {users.userID}</p>
                <p>Email: {users.email} </p>
                <p>Naam: {users.fname} {users.lname}</p>
                <p>role: {users.role}</p>
              </div>
            ))}
          </div>
          <div className="posts">
            {posts.map((posts) => (
              <div className="infoposts">
                <p>id: {posts.id}</p>
                <p>Title: {posts.title}</p>
                <p className="bericht">Bericht: {posts.bericht}</p>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

import logo from '../logo.svg';
import '../App.css';
import { getAuth } from "firebase/auth";
import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';

function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const usersCollectionRef = collection(db, "users")
  const postsCollectionRef = collection(db, "posts")
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
        setUsers(filteredData)
      } catch (err) {
        console.error(err);
        console.log('Log in om de data te zien')
      }
    };

    getUsers();
    
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
        setPosts(filteredData)
      } catch (err) {
        console.error(err);
        console.log('Log in om de data te zien')  
      }
    };

    getPosts();
    
  }, [postsCollectionRef, usersCollectionRef])
  const auth = getAuth();
  let account;
  //check if user is logged in
  if (auth?.currentUser?.email !== null) {
    //user is logged in
    account = auth?.currentUser?.email
  } else {
    //user is not logged in
    account = 'je bent niet ingelogt'
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
        <div className='userPosts'>
          <p>Email: {account}</p>
          <p>ID: {auth?.currentUser?.uid}</p>
          <div className='user'>
            {users.map((users) => (
              <div className='info'>
                <p>id: {users.userID}</p>
                <p>Email: {users.email} </p>
                <p>Naam: {users.fname} {users.lname} </p>
                <p>role: {users.role}</p>
              </div>
            ))}
          </div>
          <div className='posts'>
            {posts.map((posts) => (
              <div className='infoposts'>
                <p>id: {posts.id}</p>
                <p>Title: {posts.title}</p>
                <p className='bericht'>Bericht: {posts.bericht}</p>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
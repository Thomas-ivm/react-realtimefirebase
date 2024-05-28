import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function EditPost() {
  // const uid = localStorage.getItem("auth");
  const postUID = localStorage.getItem("postUID");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [bericht, setBericht] = useState("");
  const [writerUid, setwriterUid] = useState("");

  useEffect(() => {
    const docRef = doc(db, "posts", postUID);
    const docSnap = getDoc(docRef);
    docSnap.then((doc) => {
      if (!doc.exists()) {
        console.log("geen posts");
        return null;
      } else {
        const post = doc.data();
        console.log("Posts document data:", post);
        setPosts(post);
        setTitle(post.title);
        setBericht(post.bericht);

      }
    });
  }, [postUID]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth();
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();

    if (ss < 10) ss = '0' + ss;
    if (min < 10) min = '0' + min;
    if (hh < 10) hh = '0' + hh;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const UTimestamp = hh + ':' + min + ':' + ss +  ' ' +  dd + '/' + mm + '/' + yyyy;


    try {
      const userRef = doc(db, "posts", postUID);
      await updateDoc(userRef, {
        title,
        bericht,
        UTimestamp,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="editPost">
      <h1>Edit Post</h1>
      <div className="editPostInput">
      <p>{posts.writerUid}</p>
        <input required defaultValue={posts.title} onChange={(e) => setTitle(e.target.value)} />
        <textarea required defaultValue={posts.bericht} onChange={(e) => setBericht(e.target.value)}/>
      </div>
        <button onClick={handleEdit}>Opslaan</button>
    </div>
  );
}
export default EditPost;

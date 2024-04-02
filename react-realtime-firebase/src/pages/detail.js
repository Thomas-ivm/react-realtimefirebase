import { doc as firestoreDoc, setDoc } from 'firebase/firestore';
import '../App.css';
import { auth, db } from '../config/firebase';
import { useState, useEffect } from 'react';

function Detail() {
    const [user, setUser] = useState(null);
    const fetchUserInfo = async () => {
        // const { uid } = auth().currentUser
        const { currentUser } = auth;
        if (!currentUser) {
            console.log('geen inlog gegevens ' + currentUser)
            return;
        } else {
            const { uid, email } = currentUser;
            const userData = {
                uid: uid,
                email: email,
                // Add more fields as needed
            };
            const userRef = await setDoc(firestoreDoc(db, "users", uid), userData);
            const userDoc = await userRef.get();
            const userDataFromDoc = userDoc.data();
            setUser(userDataFromDoc);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    if (!user) {
        console.log('geen gebrukers gegevens')
        return null
    } else {
        return (
            <div className='detailPage'>
                <h1>Your account</h1>
                <div>Email: {auth.currentUser?.email}</div>
                <div>UID: {auth.currentUser?.uid}</div>
                <div>Naam: {user && user?.fname}</div>
                <div>Role: {user && user?.role}</div>
                <div></div>
            </div>
        )
    }
}

export default Detail
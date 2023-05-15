import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { auth, database } from "../../../../config/firebase";

export class User {
    constructor(username, email, phone, bio, address, image) {
        this.username = username;
        this.image = image;
        this.email = email;
        this.phone = phone;
        this.bio = bio;
        this.address = address;
    }
    getUser = async () => {
        const currentUser = auth.currentUser;
        const q = query(collection(database, 'users'), where('_id', "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs[0].data();

        this.username = userData.username;
        this.email = userData.email;
        this.phone = userData.phone;
        this.image = userData.image;
        this.bio = userData.bio;
        this.address = userData.address;
    };
}

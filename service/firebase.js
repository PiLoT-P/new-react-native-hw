import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { doc, collection, addDoc, getDocs, updateDoc, arrayUnion} from "firebase/firestore";
import { auth, db } from '../config';

export const registerServer = async ({ avatar, name, email, password }) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
            displayName: name,
            photoURL: avatar,
        });
        return user;
    } catch (error) {
        alert(error.message);
    }
}

export const loginServer = async ({ email, password }) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        throw error;
    }
};

export const logoutServer = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        alert(error.message)
    }
}

export const createPostServer = async ({ image, name, location, likes, comments, coords }) => {
        try {
            const docRef = await addDoc(collection(db, 'posts'), {
                image,
                name,
                coords,
                location,
                comments,
                likes,
            });
            return docRef.id;
        } catch (e) {
          console.error('Error adding document: ', e);
            throw e;
        }
};
  
export const readPostsServer= async () => {
    try {
        const response = [];
        const snapshot = await getDocs(collection(db, 'posts'));

        snapshot.forEach((doc) => response.push({ post: doc.data(), postId: doc.id }));
        console.log(response);

        return response;
    } catch (error) {
      console.log(error);
            throw error;
    }
};
  
export const createCommentServer = async ({ postId, avatarImage, comment }) => {
    try {
        const postRef = doc(db, 'posts', postId);
        const date = new Date().toUTCString().slice(5, 22);
        await updateDoc(postRef, { comments: arrayUnion({ avatarImage, comment, date }) })
        return { postId, avatarImage, comment, date };

    } catch (error) {
        console.log(error)
    }
}
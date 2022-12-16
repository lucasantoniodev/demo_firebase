import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { firestoreDatabase } from "../firebase/firebase";

export interface UserProps {
  id?: string;
  email?: string | null;
}

const userCollectionRef = collection(firestoreDatabase, "usersGoogleAccount");

class UserService {
  async addUser(user: UserProps) {
    return addDoc(userCollectionRef, user);
  }

  async updateUser(id: string, updatedUser: any) {
    const userDoc = doc(firestoreDatabase, "usersGoogleAccount", id);
    return updateDoc(userDoc, updatedUser);
  }

  async deleteUser(id: string) {
    const userDoc = doc(firestoreDatabase, "usersGoogleAccount", id);
    return deleteDoc(userDoc);
  }

  async getAllUsers() {
    const list = (await getDocs(userCollectionRef)).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return list;
  }

  async getUserByID(id: string) {
    // const userDoc = doc(firestoreDatabase, "usersGoogleAccount", id);

    const q = query(userCollectionRef, where("id", "==", id));
    const doc = (await getDocs(q)).docs[0];
    if (doc) {
      const json = JSON.stringify((await getDocs(q)).docs[0].data());

      return JSON.parse(json);
    }

    return null;
  }
}

export const UserServiceInstance = new UserService();

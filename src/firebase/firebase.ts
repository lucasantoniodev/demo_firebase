import { initializeApp } from "firebase/app";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase-admin";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDTsbuQ7E_8QJyl3iDLYj0DOl6grzlZZGQ",
  authDomain: "learning-firebase-36d1b.firebaseapp.com",
  databaseURL: "https://learning-firebase-36d1b-default-rtdb.firebaseio.com",
  projectId: "learning-firebase-36d1b",
  storageBucket: "learning-firebase-36d1b.appspot.com",
  messagingSenderId: "767280926704",
  appId: "1:767280926704:web:9af132d0400e63eab9d735",
  measurementId: "G-GZMLT3X4DN",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const appAdmin = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestoreDatabase = getFirestore(app);


/***
 * Front-end:
 *  - Criar nova expressão
 *      Requisitos: { expressão: string; {id: google.uid, name: string, email: string}} , TOKEN DE PERMISSÃO 
 * 
 * - Back-end:
 *  - Verificar se o token é valido no firebase
 *    - Criar uma expressão no banco de dados do mongo db
 * 
 */

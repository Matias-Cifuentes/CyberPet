// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { getFirestore,collection, addDoc, getDocs, onSnapshot, deleteDoc, updateDoc,doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlsW4cYnJR0NjCtrSKvOfiND7WzaCwOHY",
    authDomain: "cyberpet-f0bd6.firebaseapp.com",
    projectId: "cyberpet-f0bd6",
    storageBucket: "cyberpet-f0bd6.firebasestorage.app",
    messagingSenderId: "233648957002",
    appId: "1:233648957002:web:acaf81b37a76b3f9e9a8b3"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Save a New Task in Firestore
 * param {string} title the title of the Task
 * param {string} description the description of the Task
 */
export const saveTask = (title, description, edad, color) =>
  addDoc(collection(db, "tasks"), { title, description, edad, color });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 *param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));
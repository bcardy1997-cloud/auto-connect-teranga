// Auto-Connect Teranga — point d'entrée Firebase partagé (module ES).
// Centralise l'initialisation Firebase + les fonctions Auth/Firestore utilisées
// par admin.html, vehicules/fiche.html, migrate.html et la page d'accueil.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore, collection, doc, addDoc, setDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, where, orderBy, serverTimestamp, limit, increment
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

var app = initializeApp(window.ACT_CONFIG.firebase);
var auth = getAuth(app);
var db = getFirestore(app);

window.ACT_FB = {
  auth: auth, db: db,
  signInWithEmailAndPassword: signInWithEmailAndPassword,
  onAuthStateChanged: onAuthStateChanged,
  signOut: signOut,
  sendPasswordResetEmail: sendPasswordResetEmail,
  collection: collection, doc: doc, addDoc: addDoc, setDoc: setDoc,
  updateDoc: updateDoc, deleteDoc: deleteDoc, getDocs: getDocs, getDoc: getDoc,
  query: query, where: where, orderBy: orderBy, serverTimestamp: serverTimestamp,
  limit: limit,
  increment: increment
};
window.dispatchEvent(new CustomEvent('act-firebase-ready'));

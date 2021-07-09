const firebaseConfig = {
  apiKey: "AIzaSyCR2jHXYMP2uHMWvyZWIRwZYBXsTVfX7u0",
  authDomain: "disneyplus-clone-7a770.firebaseapp.com",
  projectId: "disneyplus-clone-7a770",
  storageBucket: "disneyplus-clone-7a770.appspot.com",
  messagingSenderId: "1015171596113",
  appId: "1:1015171596113:web:190697d5dc82eea2fedd70",
  measurementId: "G-17LNQBRRZR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;

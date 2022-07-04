import firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyDfO0su8cJTcFNWqIn3zstHhniF97HxZsc",
  authDomain: "dynamicmediatools-55686.firebaseapp.com",
  projectId: "dynamicmediatools-55686",
  storageBucket: "dynamicmediatools-55686.appspot.com",
  messagingSenderId: "449360156335",
  appId: "1:449360156335:web:9120c54fbbe0de36cb265a"
};

// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();


export { storage , firebaseApp };
export default db;

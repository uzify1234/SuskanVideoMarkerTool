import firebase from 'firebase';



// const firebaseConfig2 = {
  //   apiKey: "AIzaSyB4nC2kcuHH5jajbufBKFNWnocEB7gMsjw",
  //   authDomain: "mutualfunds-465dd.firebaseapp.com",
  //   databaseURL: "https://mutualfunds-465dd.firebaseio.com",
  //   projectId: "mutualfunds-465dd",
  //   storageBucket: "mutualfunds-465dd.appspot.com",
  //   messagingSenderId: "571432955011",
  //   appId: "1:571432955011:web:12c1b5c02a08775593bfb6"
  // };

  const firebaseConfig2 = {
    apiKey: "AIzaSyBTNYxuQCS6LA11Jbc9bjfq8GW1-PuL-po",
    authDomain: "suskanmaster.firebaseapp.com",
    databaseURL: "https://suskanmaster-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "suskanmaster",
    storageBucket: "suskanmaster.appspot.com",
    messagingSenderId: "356742756849",
    appId: "1:356742756849:web:211f0c9fd657a9c77a6c50"
  };

const firebaseApp2 =  firebase.initializeApp(firebaseConfig2, 'secondary');
const auth = firebaseApp2.auth();
export default auth;


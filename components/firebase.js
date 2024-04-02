import { initializeApp } from "firebase/app";


import { getFirestore } from "firebase/firestore";


import { getAuth } from "firebase/auth";


import { getAnalytics, isSupported } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAgkAnBVEZF8uR1g-riwHY3CRekHXt5n7o",
  authDomain: "solent-e-stores.firebaseapp.com",
  projectId: "solent-e-stores",
  storageBucket: "solent-e-stores.appspot.com",
  messagingSenderId: "1023431440643",
  appId: "1:1023431440643:web:91f554fe21ec417ae11136",
  measurementId: "G-72FFPE3BR9" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);

let analytics;
if (typeof window !== "undefined") {
    isSupported().then((isSupported) => {
        if (isSupported) {
            analytics = getAnalytics(app);
        } else {
            console.log("Firebase Analytics is not supported in this environment.");
        }
    });
}

export { app, db, auth, analytics };
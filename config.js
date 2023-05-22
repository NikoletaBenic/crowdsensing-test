const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyBp5dyzwylYVB1x7AGzfuqUYuu9PCHBNh8",
    authDomain: "crowdsensing-72d97.firebaseapp.com",
    projectId: "crowdsensing-72d97",
    storageBucket: "crowdsensing-72d97.appspot.com",
    messagingSenderId: "206745970128",
    appId: "1:206745970128:web:42a5b6cbcc58e4149905d5",
    measurementId: "G-XQRS9X126D"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Mesaurements = db.collection("Mesaurements");
module.exports = Mesaurements;
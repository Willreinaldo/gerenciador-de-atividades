import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDR5i2Px_jZBdSrleP0R0eLVdvPB98SdDs",
  authDomain: "gerenciador-atividades.firebaseapp.com",
  projectId: "gerenciador-atividades",
  storageBucket: "gerenciador-atividades.appspot.com",
  messagingSenderId: "658116920499",
  appId: "1:658116920499:web:b46ecbdbfce60cea905cc6",
  measurementId: "G-9PQSGEPYG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

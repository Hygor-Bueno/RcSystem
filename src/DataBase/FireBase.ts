import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

export default class Firebase {
  app;  
  db;  
  auth;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCveyuIg4c-HW7g2-_QOMkx0GnRDUn5E6k",
      authDomain: "rcsystem-77b5c.firebaseapp.com",
      projectId: "rcsystem-77b5c",
      storageBucket: "rcsystem-77b5c.appspot.com",
      messagingSenderId: "657546411803",
      appId: "1:657546411803:web:07ad4ab4dae9a8db67ddbe",
      measurementId: "G-VJ25F9Y80C"
    };

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }
}
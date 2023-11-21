import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBrPKZDbbLrSGAvsZmqkQtSiYU2qeugkyo",
  authDomain: "newsfeed-project-228fb.firebaseapp.com",
  projectId: "newsfeed-project-228fb",
  storageBucket: "newsfeed-project-228fb.appspot.com",
  messagingSenderId: "761142195061",
  appId: "1:761142195061:web:96363b2d5948da763a193c",
  measurementId: "G-T1ERBVCFX2",
};

export const db = initializeApp(firebaseConfig);

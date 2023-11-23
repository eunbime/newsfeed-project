// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCiifWO6ZuWMiwxaMkdvU59zUfQa5oPYzQ',
  authDomain: 'newsfeed-3c2dc.firebaseapp.com',
  projectId: 'newsfeed-3c2dc',
  storageBucket: 'newsfeed-3c2dc.appspot.com',
  messagingSenderId: '836119563353',
  appId: '1:836119563353:web:541971cd0eee84d7a2b548',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

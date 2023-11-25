import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyBZ7OBLcoy0DBj8XDpDpKHMLyZW9xeYkyU',
  authDomain: 'newsfeed-project-2bb4a.firebaseapp.com',
  projectId: 'newsfeed-project-2bb4a',
  storageBucket: 'newsfeed-project-2bb4a.appspot.com',
  messagingSenderId: '51797644632',
  appId: '1:51797644632:web:2b89cd7670287c1c33c12d',
  measurementId: 'G-GN5ZDPVQX3',
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

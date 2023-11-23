import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FB_API_KEY,
//   authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// }

const firebaseConfig = {
  apiKey: 'AIzaSyDxrbLKQ54L8c9JJ2udRRkJ43EKEXGKNjA',
  authDomain: 'fir-test-ac8bb.firebaseapp.com',
  projectId: 'fir-test-ac8bb',
  storageBucket: 'fir-test-ac8bb.appspot.com',
  messagingSenderId: '586348886819',
  appId: '1:586348886819:web:db365b9a7e14675e34aa96',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

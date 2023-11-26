import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// //Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FB_API_KEY,
//   authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// }

const firebaseConfig = {
  apiKey: 'AIzaSyCiifWO6ZuWMiwxaMkdvU59zUfQa5oPYzQ',
  authDomain: 'newsfeed-3c2dc.firebaseapp.com',
  projectId: 'newsfeed-3c2dc',
  storageBucket: 'newsfeed-3c2dc.appspot.com',
  messagingSenderId: '836119563353',
  appId: '1:836119563353:web:541971cd0eee84d7a2b548',
}

// const firebaseConfig = {
//   apiKey: 'AIzaSyC4C_mhom2MHPk4qE9NjG2_855CDMLffxs',
//   authDomain: 'sparta-newspeed.firebaseapp.com',
//   projectId: 'sparta-newspeed',
//   storageBucket: 'sparta-newspeed.appspot.com',
//   messagingSenderId: '508902908574',
//   appId: '1:508902908574:web:d2cbefe81d888bf3e2118f',
// }

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

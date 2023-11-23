import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBZ7OBLcoy0DBj8XDpDpKHMLyZW9xeYkyU',
  authDomain: 'newsfeed-project-2bb4a.firebaseapp.com',
  projectId: 'newsfeed-project-2bb4a',
  storageBucket: 'newsfeed-project-2bb4a.appspot.com',
  messagingSenderId: '51797644632',
  appId: '1:51797644632:web:2b89cd7670287c1c33c12d',
  measurementId: 'G-GN5ZDPVQX3',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app) // 인증 정보
export const db = getFirestore(app) // 데이터 가져오기

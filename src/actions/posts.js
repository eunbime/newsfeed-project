// import { collection, getDocs } from 'firebase/firestore'
// import { db } from '../firebase'

// export const fetchPosts = async (dispatch, getState) => {
//   const querySnapshot = await getDocs(collection(db, 'posts'))
//   const initialPosts = []
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`)
//     const data = {
//       id: doc.id,
//       ...doc.data(),
//     }
//     initialPosts.push(data)
//     console.log(initialPosts)
//     dispatch({ type: 'FETCH_POSTS', payload: initialPosts })
//   })
// }

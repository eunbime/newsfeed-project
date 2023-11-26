import GlobalStyle from 'GlobalStyle'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from 'redux/modules/auth'
import Router from 'shared/Router'
import { auth } from './firebase'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('App: user', user)
      dispatch(setLogin(user.uid))
    })
  }, [])

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  )
}

export default App

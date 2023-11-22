import PostList from 'components/PostList'
import TabNavigation from 'components/TabNavigation'
import { db } from 'firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import styled from 'styled-components'

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'topics'))
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    }
    fetchData()
  }, [])

  return (
    <>
      <TabNavigation />
      <Container>
        <ListContainer>
          {/* topics_array.map((topic) => topic.id) */}
          <>
            <h2>토픽</h2>
            <PostList />
          </>
          <>
            <h2>토픽</h2>
            <PostList />
          </>
          <>
            <h2>토픽</h2>
            <PostList />
          </>
          <>
            <h2>토픽</h2>
            <PostList />
          </>
          <>
            <h2>토픽</h2>
            <PostList />
          </>
        </ListContainer>
      </Container>
    </>
  )
}

export default Home

const Container = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 1rem;
`

const ListContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1250px;
  margin: 0 auto;
`

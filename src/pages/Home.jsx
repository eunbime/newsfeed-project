import PostCarousel from 'components/PostCarousel'
import TabNavigation from 'components/TabNavigation'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setTopic } from 'redux/modules/topics'
import styled from 'styled-components'
import { db } from '../firebase'

function Home() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topics)

  useEffect(() => {
    const fetchTopic = async () => {
      const querySnapshot = await getDocs(collection(db, 'topics'))
      const initialTopics = []

      querySnapshot.forEach((doc) => {
        initialTopics.push({ id: doc.id, ...doc.data() })
      })
      dispatch(setTopic(initialTopics))
    }
    fetchTopic()
  }, [])

  return (
    <>
      <TabNavigation />
      <Container>
        <ListContainer>
          {topics.length > 0 ? (
            topics.map((topic) => (
              <div key={topic.id}>
                <Link to={`/topic/${topic.topicName}`} state={{ topic: topic }}>
                  <h2>{topic.topicName}</h2>
                </Link>
                <PostCarousel topic={topic} />
              </div>
            ))
          ) : (
            <div>
              <h2>현재 게시된 포스트가 없습니다.</h2>
            </div>
          )}
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

  & h2 {
    padding-bottom: 0.5rem;
    font-size: x-large;
    font-weight: bold;
  }
`

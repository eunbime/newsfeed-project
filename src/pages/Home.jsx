import PostList from 'components/PostList'
import TabNavigation from 'components/TabNavigation'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Home() {
  const topics = useSelector((state) => state.topics.topics)
  const store = useSelector((state) => state)
  console.log(store)
  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     const topics = await data
  //     return topics
  //   }
  //   fetchTopics
  // }, [])
  // const getData = () => {
  //   data.then((appData) => {
  //     return appData
  //   })
  // }

  return (
    <>
      <TabNavigation />
      <Container>
        <ListContainer>
          {topics.map((topic) => (
            <div key={topic.id}>
              <Link to="/topic">
                <h2>{topic.topicName}</h2>
              </Link>
              <PostList topic={topic} />
            </div>
          ))}
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

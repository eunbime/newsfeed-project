import PostCarousel from 'components/PostCarousel'
import TabNavigation from 'components/TabNavigation'
import TopicPostList from 'components/TopicPostList'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

function Topic() {
  const location = useLocation()
  const topic = location.state.topic

  return (
    <Container>
      <TabNavigation selectedTopic={topic} />
      <CenteredPostCarousel>
        <PostCarousel topic={topic} />
      </CenteredPostCarousel>
      <TopicPostList selectedTopic={topic} />
    </Container>
  )
}

export default Topic

const Container = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 1rem;
`

const CenteredPostCarousel = styled.div`
  max-width: 1250px;
  margin: 0 auto;
`

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
        <Title>추천 피드</Title>
        <PostCarousel topic={topic} />
        <Title>실시간 게시물</Title>
        <TopicPostList selectedTopic={topic.topicName} />
      </CenteredPostCarousel>
    </Container>
  )
}

export default Topic

const Container = styled.div`
  width: 100%;
`

const CenteredPostCarousel = styled.div`
  padding: 1rem;
  max-width: 1250px;
  margin: 0 auto;
`

const Title = styled.h2`
  padding: 1rem 0;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #888;
  }

  @media (min-width: 750px) {
    font-size: x-large;
  }
`

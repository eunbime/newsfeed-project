import PostList from 'components/PostList'
import styled from 'styled-components'
function Home() {
  return (
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

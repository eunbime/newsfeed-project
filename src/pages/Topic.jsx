import Post from 'components/Post'
import PostList from 'components/PostList'
import TopicButton from 'components/TopicButton'

function Topic() {
  return (
    <div>
      <TopicButton />
      <PostList />
      <Post />
    </div>
  )
}

export default Topic

import Post from 'components/Post'
import PostList from 'components/PostList'
import TabNavigation from 'components/TabNavigation'
import TopicButton from 'components/TopicButton'

function Topic() {
  return (
    <div>
      <TabNavigation />
      <TopicButton />
      <PostList />
      <Post />
    </div>
  )
}

export default Topic

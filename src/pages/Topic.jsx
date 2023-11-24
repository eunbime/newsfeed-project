import TopicPostList from 'components/Post'
import PostList from 'components/PostList'
import TabNavigation from 'components/TabNavigation'
import TopicButton from 'components/TopicButton'
function Topic() {
  return (
    <div>
      <TabNavigation />
      <TopicButton />
      <PostList />
      <TopicPostList />
    </div>
  )
}

export default Topic

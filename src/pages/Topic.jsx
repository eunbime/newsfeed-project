import PostList from 'components/PostList'
import TabNavigation from 'components/TabNavigation'
import TopicButton from 'components/TopicButton'
function Topic() {
  return (
    <div>
      <TabNavigation />
      <TopicButton />
      <PostList />
    </div>
  )
}

export default Topic

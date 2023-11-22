import Post from 'components/Post'
import PostList from 'components/PostList'
import TabNavigation from 'components/TabNavigation'

function Topic() {
  return (
    <div>
      <TabNavigation />
      {/* <TopicButton /> */}
      <PostList />
      <Post />
    </div>
  )
}

export default Topic

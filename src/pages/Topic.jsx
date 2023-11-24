
import Post from 'components/Post'
import PostList from 'components/PostList'

import TabNavigation from 'components/TabNavigation'
import TopicButton from 'components/TopicButton'

import { useLocation } from 'react-router-dom'

function Topic() {
  const location = useLocation()
  const topic = location.state.topic
  console.log(topic)

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

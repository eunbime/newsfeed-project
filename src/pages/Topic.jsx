<<<<<<< HEAD
import TopicPostList from 'components/Post'
=======

import Post from 'components/Post'
>>>>>>> b2b153f2dacdf25e42d5a8f6f738fce60c191fbc
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

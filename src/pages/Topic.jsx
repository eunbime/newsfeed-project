import TabNavigation from 'components/TabNavigation'
import { useLocation } from 'react-router-dom'

function Topic() {
  const location = useLocation()
  const topic = location.state.topic
  console.log(topic)

  return (
    <div>
      <TabNavigation />
      {/* <TopicButton /> */}
    </div>
  )
}

export default Topic

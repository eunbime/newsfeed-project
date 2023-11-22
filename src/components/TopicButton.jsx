import { useDispatch, useSelector } from 'react-redux'
import { setTopic } from 'redux/config/modules/topics'

const TopicButton = () => {
  const handleTopicClick = useSelector((state) => state.topic)
  const dispatch = useDispatch()

  const onhandleTopicClick = (event) => {
    if (event.target === event.currentTarget) return

    dispatch(setTopic(event.target.textContext))
  }

  return (
    <div onClick={onhandleTopicClick}>
      <button $handleTopicClick={handleTopicClick}>Hot Place🔥</button>
      <button $handleTopicClick={handleTopicClick}>맛집🍴</button>
      <button $handleTopicClick={handleTopicClick}>요리🍙</button>
      <button $handleTopicClick={handleTopicClick}>반려동물🐾</button>
    </div>
  )
}

export default TopicButton

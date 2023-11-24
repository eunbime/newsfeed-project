import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  fetchTopics,
  showLessTopics,
  showMoreTopics,
} from '../redux/config/modules/topics'

function TopicButton() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topics)
  const visibleTopics = useSelector((state) => state.topics.visibleTopics)

  useEffect(() => {
    dispatch(fetchTopics())
  }, [dispatch])

  const handleShowMore = () => {
    dispatch(showMoreTopics())
  }

  const handleShowLess = () => {
    dispatch(showLessTopics())
  }

  const handleButtonClick = (topic) => {
    console.log('Clicked Topic:', topic)
    // 버튼 눌렀을때 데이터 확인하기
  }

  return (
    <div>
      <ButtonContainer>
        {topics.slice(0, visibleTopics).map((topic) => (
          <div key={topic.id}>
            <StyledButton onClick={() => handleButtonClick(topic)}>
              {topic.topicIco}
            </StyledButton>
            <p>{topic.topicName}</p>
          </div>
        ))}

        {topics.length > visibleTopics && (
          <StyledButton onClick={handleShowMore}>더 보기</StyledButton>
        )}
        {visibleTopics > 5 && (
          <StyledButton onClick={handleShowLess}>접기</StyledButton>
        )}
      </ButtonContainer>
    </div>
  )
}

export default TopicButton
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 10px 10px;
`

const StyledButton = styled.button`
  padding: 10px 15px;
  margin: 10px 20px;
`

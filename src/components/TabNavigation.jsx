import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TabNavigation = () => {
  const topics = useSelector((state) => state.topics)
  const [showAll, setShowAll] = useState(false)
  const [selectedTab, setSelectedTab] = useState('')
  const visibleTopics = showAll ? topics : topics.slice(0, 5)

  const toggleShowAll = () => {
    setShowAll((prev) => !prev)
  }

  const handleTabClick = (topicName) => {
    setSelectedTab(topicName)
  }

  return (
    <div>
      <NavigationHeader>
        <NavLink
          to={'/'}
          selected={selectedTab === 'recommended'}
          onClick={() => handleTabClick('recommended')}
        >
          추천 피드
        </NavLink>
        {visibleTopics.map((item) => (
          <NavLink
            key={item.id}
            to={`/topic/${item.topicName}`}
            state={{ topic: item }}
            selected={selectedTab === item.topicName}
            onClick={() => handleTabClick(item.topicName)}
          >
            <span>{item.topicIco}</span> <span>{item.topicName}</span>
          </NavLink>
        ))}
        {topics.length > 5 && (
          <ShowHideButton onClick={toggleShowAll}>
            {showAll ? '줄이기' : '더보기'}
          </ShowHideButton>
        )}
      </NavigationHeader>
    </div>
  )
}

export default TabNavigation

const ShowHideButton = styled.button`
  font-size: small;
  padding: 0.4rem;
  color: #fff;
  background-color: gray;
  border-radius: 0.5rem;
  border: none;
  text-align: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 50%;
    cursor: pointer;
  }

  @media (min-width: 750px) {
    font-size: medium;
  }
`

const NavigationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  gap: 1rem;
  padding: 3rem 1rem 2rem 1rem;
`

const NavLink = styled(Link)`
  font-size: small;
  font-weight: 500;
  padding: 0.5rem;
  color: ${(props) => (props.selected ? '#000' : '#fff')};
  background-color: ${(props) => (props.selected ? '#EAE374' : `#FC913A`)};
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 50%;
    cursor: pointer;
  }

  @media (min-width: 750px) {
    font-size: medium;
  }
`

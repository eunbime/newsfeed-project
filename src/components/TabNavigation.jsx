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
          {item.topicName}
        </NavLink>
      ))}
      {topics.length > 5 && (
        <ShowHideButton onClick={toggleShowAll}>
          {showAll ? '줄이기' : '더보기'}
        </ShowHideButton>
      )}
    </NavigationHeader>
  )
}

export default TabNavigation

const ShowHideButton = styled.button`
  font-size: medium;
  padding: 0.5rem;
  color: #fff;
  background-color: gray;
  border-radius: 0.5rem;
  border: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`

const NavigationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  gap: 0.5rem;
`

const NavLink = styled(Link)`
  font-size: medium;
  padding: 0.5rem;
  color: ${(props) =>
    props.selected ? '#000' : '#fff'}; /* Change color based on selection */
  background-color: ${(props) =>
    props.selected
      ? 'lightgray'
      : 'gray'}; /* Change background based on selection */
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`

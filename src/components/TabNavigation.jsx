import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TabNavigation = () => {
  const topics = useSelector((state) => state.topics)
  return (
    <NavigationHeader>
      <NavLink to={'/'}>추천 피드</NavLink>
      {topics.map((item) => (
        <NavLink
          key={item.id}
          to={`/topic/${item.topicName}`}
          state={{ topic: item }}
        >
          <span>{item.topicIco}</span> <span>{item.topicName}</span>
        </NavLink>
      ))}
    </NavigationHeader>
  )
}

export default TabNavigation

const NavigationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  gap: 1rem;
`

const NavLink = styled(Link)`
  font-size: small;
  padding: 0.5rem 0.8rem;
  color: #fff;
  background-color: gray;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 50%;
  }

  @media (min-width: 750px) {
    font-size: medium;
  }
`

import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TabNavigation = () => {
  return (
    <NavigationHeader>
      <NavLink to={'/'}>추천 피드</NavLink>
      <NavLink to={'/topic'}>실시간</NavLink>
    </NavigationHeader>
  )
}

export default TabNavigation

const NavigationHeader = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #777;
`

const NavLink = styled(Link)`
  font-size: medium;
`

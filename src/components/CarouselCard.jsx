import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const CarouselCard = ({ post }) => {
  const navigate = useNavigate()
  const defaultImg = 'assets/default-profile.jpeg'
  return (
    <CardContainer
      onClick={() => navigate(`/detail/${post.id}`, { state: post })}
      image={post.postImg}
    >
      <TextBox>
        <CardTitle>{post.title}</CardTitle>
        <User>
          <UserImg>
            <img src={post.userimg || defaultImg} alt="profile" />
          </UserImg>
          <UserName>{post.userName}</UserName>
        </User>
      </TextBox>
    </CardContainer>
  )
}

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 55;
  padding: 1rem;
  color: #fff;
  font-size: x-large;
  background-color: rgba(0, 0, 0, 0.3);
`

const CardContainer = styled.div`
  min-width: 200px;
  min-height: 120px;
  position: relative;
  z-index: 0;
  cursor: pointer;
  transition: 0.3s;
  background-color: gray;
  background-image: url(${(props) => props.image});
  background-size: cover;

  @media (min-width: 750px) {
    transition: 0.5s;
    width: 300px;
    height: 180px;
  }
  // 선택자 사용하여 요소 선택
  ${TextBox} {
    display: none;
  }
  &:hover {
    ${TextBox} {
      display: block;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.5s;
    }
  }
`
const CardTitle = styled.h3`
  font-size: large;

  @media (min-width: 750px) {
    font-size: x-large;
    font-weight: 600;
  }
`
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const UserImg = styled.div`
  width: 30px;
  height: 30px;
  background-color: #222;
  border-radius: 100%;
  overflow: hidden;
  background-size: cover;
  & img {
    width: inherit;
    height: inherit;
  }

  @media (min-width: 750px) {
    width: 40px;
    height: 40px;
  }
`
const UserName = styled.p`
  /*  */
`
export default CarouselCard

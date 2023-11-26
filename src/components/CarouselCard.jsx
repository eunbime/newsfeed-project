import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const CarouselCard = ({ post }) => {
  const navigate = useNavigate()
  const defaultImg = 'assets/default-profile.jpeg'
  return (
    <CardContainer
      onClick={() => navigate(`/detail/${post.id}`, { state: post })}
      image={post.postImg || defaultImg}
    >
      <TextBox>
        <CardTitle>{post.title}</CardTitle>
        <User>
          <UserImg>
            <img
              src="data:image/png;base64,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"
              alt="profile"
            />
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
    }
  }
`
const CardTitle = styled.h3`
  font-size: xx-large;
`
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const UserImg = styled.div`
  width: 40px;
  height: 40px;
  background-color: #222;
  border-radius: 100%;
  overflow: hidden;
  background-size: cover;
  & img {
    width: inherit;
    height: inherit;
  }
`
const UserName = styled.p`
  /*  */
`
export default CarouselCard

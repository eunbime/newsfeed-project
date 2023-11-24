import styled from 'styled-components'

const CarouselCard = ({ post }) => {
  return (
    <CardContainer>
      <TextBox>
        <CardTitle>{post.title}</CardTitle>
        <User>
          <UserImg>
            <img src="" alt="" />
          </UserImg>
          <UserName>{post.userName}</UserName>
        </User>
      </TextBox>
      <ImgBox></ImgBox>
    </CardContainer>
  )
}

const ImgBox = styled.div`
  width: inherit;
  height: inherit;
  position: absolute;
  z-index: 1;
`

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 55;
  padding: 1rem;
  transition: all ease-in-out 0.3s;
  color: #fff;
  font-size: x-large;
`

const CardContainer = styled.div`
  min-width: 300px;
  height: 180px;
  background-color: #777;
  position: relative;
  z-index: 0;
  cursor: pointer;
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
`

const UserName = styled.p`
  /*  */
`

export default CarouselCard

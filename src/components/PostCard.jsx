import styled from "styled-components";

const PostCard = () => {
  return (
    <CardContainer>
      {/* link or navigate */}
      <TextBox>
        <h2>content</h2>
        <span>username</span>
      </TextBox>
      <ImgBox></ImgBox>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  min-width: 300px;
  height: 150px;
  background-color: #eee;
`;

const ImgBox = styled.div`
  border: 1px solid black;
  width: inherit;
  height: inherit;
`;

const TextBox = styled.div`
  width: inherit;
  height: inherit;
  color: transparent;
  transition: all ease-in-out 0.3s;
  &:hover {
    color: #222;
  }
`;

export default PostCard;

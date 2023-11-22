import React, { useState } from "react";
import styled from "styled-components";

function DetailPost() {
  // 제목관련 usestate
  const [title, setTitle] = useState("");
  // 내용관련 usestate
  const [index, setIndex] = useState("");
  //주제관련은 위에 selected를 사용
  const [selected, setSelected] = useState("맛집");

  // const AddPost = (event) => {
  //   event.preventDefault();
  // const WaringMessage = () => {
  //   if (!title || !index) {
  //     alert("누락된 부분을 작성해주세요!");
  //   }
  // };
  const WarningAlert = () => {
    if (!title || !index) {
      // title 또는 content가 공란이면 alert를 띄웁니다.
      alert("제목과 내용을 모두 입력해주세요.");
    } else {
      // title과 content가 모두 입력되었을 때의 로직을 수행합니다.
      console.log("등록 버튼이 클릭되었습니다.");
      console.log("제목:", title);
      console.log("내용:", index);
      console.log("주제:", selected);
    }
  };

  return (
    <Form>
      <Container id="PostBox">
        <InputWrapper>
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            placeholder="제목을 작성해주세요"
          />
        </InputWrapper>
        <InputWrapper>
          <textarea
            onChange={(event) => setIndex(event.target.value)}
            value={index}
            placeholder="내용을 작성해주세요"
          ></textarea>
        </InputWrapper>
        <SelectWrapper>
          {/* 옵션태그를 이용하여 원하는 주제를 선정 */}
          {/* 에러 : 주제를 클릭했을때 원하는 주제로 안넘어가진다 */}
          <select onChange={(event) => setSelected(event.target.value)}>
            <option>맛집</option>
            <option>여행</option>
            <option>기타</option>
          </select>
        </SelectWrapper>
        <ButtonWrapper>
          <button onClick={WarningAlert}>등록버튼</button>
        </ButtonWrapper>
      </Container>
    </Form>
  );
}

// 전체구조
const Form = styled.form`
  background-color: #d9d9d9;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
  height: 500px;
  border-radius: 12px;
  margin: 60px auto;
`;
const Container = styled.form`
  margin: 20px;
  text-align: center;
`;
// input태그구조
const InputWrapper = styled.div`
  & textarea {
    width: 420px;
    height: 40vh;

    text-align: start;
  }
  & input {
    height: 30px;
    width: 420px;
    margin: 15px 0;
    text-align: start;
  }
`;
const SelectWrapper = styled.div`
  margin-left: 10px;
  text-align: start;

  /* select버튼 css추가본(원할시) */
  /* & select {
    width: 60px;
  } */
`;
// 버튼태그구조
const ButtonWrapper = styled.div`
  align-items: flex-end;
  text-align: end;
  margin: 10px;
`;

export default DetailPost;

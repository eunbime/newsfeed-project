import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PostCard from "./PostCard";

const PostList = () => {
  const ref = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRange = currentSlide * 316;

  useEffect(() => {
    ref.current.style.transition = "all 0.5s ease-in-out";
    ref.current.style.transform = `translateX(-${slideRange}px)`;
  }, [currentSlide]);

  const moveToNextSlide = () => {
    if (currentSlide === 3) return;
    setCurrentSlide(currentSlide + 1);
  };

  const moveToPrevSlide = () => {
    if (currentSlide === 0) return;
    setCurrentSlide(currentSlide - 1);
  };

  return (
    <Container>
      <Slider ref={ref}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </Slider>
      <PrevButton onClick={moveToPrevSlide}>⬅️</PrevButton>
      <NextButton onClick={moveToNextSlide}>➡️</NextButton>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1250px;
  position: relative;
  overflow: hidden;
`;

const Slider = styled.ul`
  display: flex;
  gap: 1rem;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0%;
`;

export default PostList;

import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PostCard from './CarouselCard'

const PostCarousel = ({ topic }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const slideRange = currentSlide * 316

  useEffect(() => {
    ref.current.style.transition = 'all 0.5s ease-in-out'
    ref.current.style.transform = `translateX(-${slideRange}px)`
  }, [currentSlide])

  const filteredPosts = posts
    .filter((item) => item.topicName === topic.topicName)
    .sort()
    .reverse()

  const moveToNextSlide = () => {
    if (currentSlide === filteredPosts.length) return
    setCurrentSlide(currentSlide + 1)
  }

  const moveToPrevSlide = () => {
    if (currentSlide === 0) return
    setCurrentSlide(currentSlide - 1)
  }

  return (
    <Container>
      <Slider ref={ref}>
        {filteredPosts.map((post) => {
          return <PostCard key={post.id} post={post} />
        })}
      </Slider>
      {filteredPosts.length > 0 ? (
        <>
          <PrevButton onClick={moveToPrevSlide}>
            <span>
              <FiChevronLeft />
            </span>
          </PrevButton>
          <NextButton onClick={moveToNextSlide}>
            <span>
              <FiChevronRight />
            </span>
          </NextButton>
        </>
      ) : (
        <NotFoundPost>
          <h2>{`현재 ${topic.topicName} 추천 포스트가 존재하지 않습니다. 🥲`}</h2>
          <Link to={'/write'}>
            <WriteButton>글 작성하러 가기</WriteButton>
          </Link>
        </NotFoundPost>
      )}
    </Container>
  )
}

const Container = styled.div`
  max-width: 1250px;
  position: relative;
  overflow: hidden;
`

const Slider = styled.ul`
  display: flex;
  gap: 1rem;
`

const PrevButton = styled.div`
  position: absolute;
  top: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: x-large;
  border-radius: 2rem;
  margin: 0 3px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  & span {
    margin: 0 0 -1px -1px;
  }
`

const NextButton = styled.div`
  position: absolute;
  top: 50%;
  right: 0%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: x-large;
  border-radius: 2rem;
  margin: 0 3px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  & span {
    margin: 0 0 -1px -1px;
  }
`
const NotFoundPost = styled.div`
  padding: 4rem;
  background-color: #eee;
  text-align: center;

  > h2 {
    font-size: medium;
    font-weight: bold;

    @media (min-width: 750px) {
      font-size: x-large;
    }
  }
`

const WriteButton = styled.button`
  border: none;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: medium;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--mainOrange);
    color: #fff;
    box-shadow: 0 0 5px #888;
  }
`

export default PostCarousel

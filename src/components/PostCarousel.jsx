import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'redux/modules/posts'
import styled from 'styled-components'
import { db } from '../firebase'
import PostCard from './CarouselCard'

const PostCarousel = ({ topic }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const slideRange = currentSlide * 316

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      const initialPosts = []

      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() })
      })
      dispatch(setPost(initialPosts))
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    ref.current.style.transition = 'all 0.5s ease-in-out'
    ref.current.style.transform = `translateX(-${slideRange}px)`
  }, [currentSlide])

  const moveToNextSlide = () => {
    if (currentSlide === 6) return
    setCurrentSlide(currentSlide + 1)
  }

  const moveToPrevSlide = () => {
    if (currentSlide === 0) return
    setCurrentSlide(currentSlide - 1)
  }

  // 선택된 topic에 대한 값 가져와서 비교

  const filteredPosts = posts.filter(
    (item) => item.topicName === topic.topicName
  )

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
          <h2>{`현재 ${topic.topicName} 추천 포스트가 존재하지 않습니다.`}</h2>
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
`

export default PostCarousel

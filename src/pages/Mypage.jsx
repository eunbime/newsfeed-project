import ProfileBox from 'components/ProfileBox'
import ProfileFigure from 'components/ProfileFigure'
import UserPostList from 'components/UserPostList'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

/**
 * TODO :
 * 마이페이지에 들어오면 현재 로그인한 유저의 uid(redux)로 db로 부터 유저정보를 가져온다
 * user profile을 만든적이 없으면 입력 하라고 뜸, 입력버튼만 보이게 함
 * user profile 수정버튼을 눌러서  내용 수정
 * 이미지 수정 버튼 누르면 이미지 업로드
 */
function Mypage() {
  const localuid = localStorage.getItem('useruid')
  const { user, posts } = useSelector((state) => state)

  const [userTopics, setUserTopics] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setUserTopics([...new Set(userTopics)])
  }, [])

  const filteredPosts = posts.filter((post) => post.userid === localuid)

  filteredPosts.map((post) => {
    if (!userTopics.includes(post.topicName)) {
      setUserTopics((prev) => [...prev, post.topicName])
    }
  })

  return (
    <PageBody>
      <Profile>
        <ProfileFigure userImg={user.userimg} />
        <ProfileBox user={user} />
      </Profile>
      <MyFeedBox>
        <TopicSelector>
          {userTopics.map((topic) => (
            <li
              onClick={() =>
                navigate(`/mypage/${topic}`, { state: { topic: topic } })
              }
            >
              {topic}
            </li>
          ))}
        </TopicSelector>
        <div>
          <UserPostList userPosts={filteredPosts} />
        </div>
      </MyFeedBox>
    </PageBody>
  )
}

const PageBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
const Profile = styled.div`
  display: flex;
  width: 800px;
  height: 380px;
  margin-left: 35px;
`
const MyFeedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1250px;
`

const TopicSelector = styled.ul`
  display: flex;
  gap: 1rem;

  > li {
    padding: 0.5rem;
    background-color: var(--mainOrange);
    border: 2px solid var(--mainOrange);
    border-radius: 1rem;
    text-align: center;
    transition: 0.5s;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: transparent;
    }
  }
`

export default Mypage

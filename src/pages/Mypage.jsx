import ProfileBox from 'components/ProfileBox'
import ProfileFigure from 'components/ProfileFigure'
import UserPostList from 'components/UserPostList'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from 'redux/modules/user'
import styled from 'styled-components'
import { db } from '../firebase'

/**
 * TODO :
 * 마이페이지에 들어오면 현재 로그인한 유저의 uid(redux)로 db로 부터 유저정보를 가져온다
 * user profile을 만든적이 없으면 입력 하라고 뜸, 입력버튼만 보이게 함
 * user profile 수정버튼을 눌러서  내용 수정
 * 이미지 수정 버튼 누르면 이미지 업로드
 */
function Mypage() {
  const dispatch = useDispatch()
  const { auth, user, topics, posts } = useSelector((state) => state)
  const [userTopics, setUserTopics] = useState([])
  const navigate = useNavigate()
  const loginUserUid = auth.loginUserUid // 사용자 UID

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'userInfo', loginUserUid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data())
        const userFromDB = docSnap.data()
        dispatch(setUser({ uid: loginUserUid, ...userFromDB }))
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
        alert('user 정보를 가져오지 못했습니다.')
      }
    }
    fetchData()
  }, [loginUserUid])

  // useEffect(() => {
  //   dispatch(filterPost(user.uid))
  // }, [])
  const filteredPosts = posts.filter((post) => post.userid === user.uid)

  filteredPosts.map((post) => {
    console.log(post.uid)
    console.log(post)
    if (userTopics.includes(post.topicName)) return
    setUserTopics((prev) => [...prev, post.topicName])
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
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Profile = styled.div`
  display: flex;
  width: 800px;
  height: 500px;
  border: 1px solid black;
`
const MyFeedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  border: 1px solid black;
`

const TopicSelector = styled.ul`
  display: flex;
  gap: 1rem;

  > li {
    padding: 0.5rem;
    background-color: gray;
    border-radius: 0.5rem;
    text-align: center;
    transition: 0.5s;

    &:hover {
      opacity: 80%;
    }
  }
`

export default Mypage

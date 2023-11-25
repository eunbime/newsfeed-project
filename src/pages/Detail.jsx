import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../firebase'

const PageContainer = styled.div`
  background-color: #f0f0f0;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 80vw;
  height: 5vh;
`

const Title = styled.h2`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AdditionalBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  flex-direction: row;
  margin: 20px;
  width: 80vw;
  height: 10vh;
`

const AdditionalInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`
const ContentBox = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  margin-top: 20px;
  width: 80vw;
  height: 40vh;
`

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  & button {
    cursor: pointer;
  }
`
const ImageContainer = styled.div`
  margin-top: 10px;
`
const AvatarImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const Detail = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(async () => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      const fetchedData = querySnapshot.docs.map((doc) => doc.data())
      setData(fetchedData)
    }
    fetchData()
  }, [])

  console.log(data)
  const newfilteredData = data.filter((item) => item.id === '5')
  console.log(newfilteredData.id)

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      const postRef = doc(db, 'posts', 'mVHcb7RDjaP9Ax6XzzXx')
      await deleteDoc(postRef)

      setData((prev) => {
        return prev.filter((item) => item.id !== newfilteredData.id)
      })
      navigate('/')
    } else {
      return
    }
  }

  const image =
    'https://firebasestorage.googleapis.com/v0/b/newsfeed-3c2dc.appspot.com/o/1635077809.jpg?alt=media&token=f1f8802a-6340-46cd-aa28-a400b195cd54'
  return (
    <PageContainer>
      <ImageContainer>
        {image && <AvatarImage src={image} alt="Avatar" />}
      </ImageContainer>
      <Box>
        <Title>
          <ul>
            {newfilteredData.map((item, index) => (
              <li key={index}>
                <h2>{item.title}</h2>
              </li>
            ))}
          </ul>
        </Title>
      </Box>
      <AdditionalBox>
        <AdditionalInfo>
          <ul>
            {newfilteredData.map((item, index) => (
              <li key={index}>
                <h2>작성자 :{item.writer}</h2>
                <h2>선택한 토픽 :{item.topic}</h2>
                <h2>작성 시간 :{item.date?.toDate().toLocaleString()}</h2>
              </li>
            ))}
          </ul>
        </AdditionalInfo>
      </AdditionalBox>
      <ContentBox>
        <Contents>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <h2>{item.content}</h2>
              </li>
            ))}
          </ul>
        </Contents>
      </ContentBox>
      <Buttons>
        <button>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </Buttons>
    </PageContainer>
  )
}

export default Detail

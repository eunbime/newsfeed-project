import { collection, deleteDoc, getDocs } from 'firebase/firestore'
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

const Detail = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const navigate = useNavigate()

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'topics'))
        const fetchedData = querySnapshot.docs.map((doc) => doc.data())
        setData(fetchedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filteredData = data.filter((item) => item.topic === '게임')
    setFilteredData(filteredData)
  }, [filteredData])

  const handleDelete = async () => {
    try {
      await deleteDoc(collection(db, 'topics'))

      navigate('/test')
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }
  return (
    <PageContainer>
      <Box>
        <Title>
          <ul>
            {filteredData.map((item, index) => (
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
            {filteredData.map((item, index) => (
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

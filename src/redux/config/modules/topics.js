import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'

// Action 타입
const FETCH_TOPICS = 'FETCH_TOPICS'
const SHOW_MORE_TOPICS = 'SHOW_MORE_TOPICS'
const SHOW_LESS_TOPICS = 'SHOW_LESS_TOPICS'

// Action 만들기
export const fetchTopics = () => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'topics'))
      const topicsData = []
      querySnapshot.forEach((doc) => {
        topicsData.push({ id: doc.id, ...doc.data() })
      })
      dispatch({ type: FETCH_TOPICS, payload: topicsData })
    } catch (error) {
      console.error('데이터를 찾을 수 없습니다.', error)
    }
  }
}

export const showMoreTopics = () => {
  return { type: SHOW_MORE_TOPICS }
}

export const showLessTopics = () => {
  return { type: SHOW_LESS_TOPICS }
}

// Reducer
const initialState = {
  topics: [],
  visibleTopics: 5, // topic버튼 보이는 항목 수
}
git
const topics = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS:
      return {
        ...state,
        topics: action.payload,
      }
    case SHOW_MORE_TOPICS:
      return {
        ...state,
        visibleTopics: state.visibleTopics + 5, // topic버튼 5개씩 추가적으로 보이도록 증가
      }
    case SHOW_LESS_TOPICS:
      return {
        ...state,
        visibleTopics: 5, // topic버튼 다시 5개만 보이도록 초기화
      }
    default:
      return state
  }
}

export default topics

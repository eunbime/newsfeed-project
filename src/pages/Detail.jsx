import { useLocation, useParams } from 'react-router-dom'

function Detail({ posts }) {
  const { id } = useParams()
  console.log(id)

  const location = useLocation()
  const state = location.state
  console.log(state)
  return (
    <div>
      <img src={state.profileImg} />
      <p>{state.userName}</p>
      <h2>{state.title}</h2>
      <img src={state.postImg} />
      <p>{state.content}</p>
    </div>
  )
}

export default Detail

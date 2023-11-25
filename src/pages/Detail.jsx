import { useLocation } from 'react-router-dom'

function Detail() {
  const location = useLocation()
  const post = location.state.post
  console.log(post.id)
  return (
    <div>
      <img src={post.profileImg} />
      <p>{post.userName}</p>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <img src={post.postImg} />
    </div>
  )
}

export default Detail

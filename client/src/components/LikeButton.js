import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { Button, Icon, Label } from 'semantic-ui-react'
import MyPopup from '../utils/MyPopup'
const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLike] = useState(false)
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLike(true)
    } else setLike(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  })

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to={'/login'} color="teal" basic>
      <Icon name="heart" />
    </Button>
  )
  return (
    <MyPopup content={liked ? 'Unlike' : 'Like'}>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label as="a" basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  )
}
const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`
export default LikeButton

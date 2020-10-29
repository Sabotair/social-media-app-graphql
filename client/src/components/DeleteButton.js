import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { FETCH_POST_QUERY } from '../utils/graphql'
import MyPopup from '../utils/MyPopup'

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
  const [deletePostOrMutation] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update: (proxy) => {
      setConfirmOpen(false)
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POST_QUERY,
        })
        const posts = data.getPosts.filter((p) => p.id !== postId)
        proxy.writeQuery({ query: FETCH_POST_QUERY, data: { getPosts: posts } })
      }
      if (callback) {
        callback()
      }
    },
  })
  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteButton

import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/context'
import { FETCH_POST_QUERY } from '../utils/graphql'
import '../App.css'
import PostForm from '../components/PostForm'
const Home = () => {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POST_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading post...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home

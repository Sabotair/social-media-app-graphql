import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { AuthProvider } from './context/context'
import AuthRoute from './utils/AuthRoute'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import SinglePost from './pages/SinglePost'
import MenuBar from './components/MenuBar'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route path="/posts/:postId" component={SinglePost} />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

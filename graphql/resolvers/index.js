const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commetsResolvers = require('./commetns')

module.exports = {
  Post: {
    likeCount: (parent) => {
      // console.log(parent)
      return parent.likes.length
    },
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commetsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
}

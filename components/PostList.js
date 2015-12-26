import React from 'react'
import Post from './Post'

const PostList = ({
  posts,
  onPostClick
}) => (
  <div>
  <h2>Post List</h2>
  {console.log('PostList: ', Object.keys(posts))}
    {Object.keys(posts).map(key =>
      <Post
        key={key}
        post={posts.key}
        onClick={() => onPostClick(key)}
      />
    )}
  </div>
)

export default PostList
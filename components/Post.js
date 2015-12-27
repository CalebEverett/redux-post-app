import React, { PropTypes } from 'react'
import marked from 'marked'

const Post = ({
  linkText,
  post,
  onClick
}) => (
  <ul>
    <li><a href="#" onClick={(e) => {
         e.preventDefault()
         onClick()
       }}>
       {linkText}
       </a>
    </li>
    <li>Title: {post.title}</li>
    <li>Body: <span dangerouslySetInnerHTML={{__html: marked(post.body)}} /></li>
    <li>Url: {post.url}</li>
  </ul>
)

export default Post
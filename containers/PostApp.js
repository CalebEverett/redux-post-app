import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, setViewPostKey, registerListeners } from '../actions'
import AddPost from '../components/AddPost'
import PostList from '../components/PostList'

class PostApp extends Component {
  componentWillMount() {
    this.props.dispatch(registerListeners())
  }

  render() {
    const { dispatch, posts, postToView } = this.props
    console.log('PostApp 1: ', this.props)
    console.log('PostApp 2: ', this.props.posts)

    return (
      <div>
        <AddPost onSubmitAdd={(postContent) => dispatch(addPost(postContent))}/>
        <PostList posts={posts} onPostClick={(key) => console.log(key)} />
      </div>
    )
  }
}

const mapStateToProps = (
  state
) => {
  console.log('mapStateToProps: ', state)
  return {
    posts: state.posts
    //postToView: state.posts[state.viewPostKey]
  }
}

export default connect(mapStateToProps)(PostApp)
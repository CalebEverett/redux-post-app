import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addPost, setViewPostKey, registerListeners } from '../actions'
import AddPost from '../components/AddPost'
import PostList from '../components/PostList'
import ViewPost from '../components/ViewPost'

class PostApp extends Component {
  render() {
    const { dispatch, posts, postToView, history } = this.props
    console.log('PostApp 1: ', this.props)
    console.log('PostApp 2: ', this.props.posts)

    return (
      <div>
        <AddPost onSubmitAdd={(postContent) => dispatch(addPost(postContent))}/>
        <PostList posts={posts} onPostClick={(key) => {
          dispatch(setViewPostKey(key))
          history.pushState(null,'/'+ key)
        }} />
        <ViewPost postToView={postToView} />
      </div>
    )
  }
}

PostApp.propTypes = {
  posts: PropTypes.object.isRequired
}

const mapStateToProps = (
  state
) => {

  return {
    posts: state.posts,
    postToView: Object.assign({}, {key: state.viewPostKey}, state.posts[state.viewPostKey])
  }
}

export default connect(mapStateToProps)(PostApp)
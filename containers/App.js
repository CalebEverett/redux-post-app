import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters, addPost, setPostFilter, registerListeners } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'
import AddPost from '../components/AddPost'
import PostList from '../components/PostList'
import ViewPost from '../components/ViewPost'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(registerListeners())
  }

  render() {
    const { dispatch, visibleTodos, visibilityFilter, posts, postFilter, postToView } = this.props
    return (
      <div>
        <div>
          <AddTodo
            onAddSubmit={text => dispatch(addTodo(text))} />
          <TodoList
            todos={visibleTodos}
            onTodoClick={id => dispatch(completeTodo(id))} />
          <Footer
            filter={visibilityFilter}
            onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))}
            onUndo={() => dispatch(ActionCreators.undo())}
            onRedo={() => dispatch(ActionCreators.redo())}
            undoDisabled={this.props.undoDisabled}
            redoDisabled={this.props.redoDisabled} />
        </div>
        <div>
          <AddPost
            onAddSubmit={postContent => dispatch(addPost(postContent))} />
          <PostList posts={posts} />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired,
  undoDisabled: PropTypes.bool.isRequired,
  redoDisabled: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  postFilter: PropTypes.string,
  postToView: PropTypes.array
}

function selectTodos(todos, filter) {
  switch (filter) {
    default:
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

function select(state) {
  return {
    undoDisabled: state.todos.past.length === 0,
    redoDisabled: state.todos.future.length === 0,
    visibleTodos: selectTodos(state.todos.present, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    posts: state.posts,
    postFilter: state.postFilter,
    postToView: state.posts[state.postFilter]
  }
}

export default connect(select)(App)


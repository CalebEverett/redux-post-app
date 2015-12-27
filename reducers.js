import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import { ADD_POST_SUCCESS, VIEW_POST } from './actions'


function post(state, action) {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return action.payload
    default:
      return state
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return Object.assign({}, state,
          post(undefined, action))
    default:
      return state
  }
}

function viewPostKey(state = {key: "No Post Selected"}, action) {
  console.log('viewPostKey: ', action.key)
  switch (action.type) {
    case VIEW_POST:
      return action.key
    default:
      return null
  }
}

export function firebaseReducer(state = null) {
  return state;
}

const postApp = combineReducers({
  posts,
  viewPostKey,
  firebase: firebaseReducer,
  routing: routeReducer
})

export default postApp

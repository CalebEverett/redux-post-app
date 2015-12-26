import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import PostApp from './containers/PostApp'
import postApp from './reducers'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import thunk from 'redux-thunk'
import Firebase from 'firebase'
import { FIREBASE_URL } from './firebase.js'

const store = compose(
  applyMiddleware(thunk)
)(createStore)(postApp, {
  firebase: new Firebase(FIREBASE_URL)
})
const history = createBrowserHistory()
syncReduxAndRouter(history, store)

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={PostApp} />
    </Router>
  </Provider>,
  rootElement
)

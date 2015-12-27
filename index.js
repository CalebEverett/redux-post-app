import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import PostApp from './containers/PostApp'
import ViewPostUrl from './containers/ViewPostUrl'
import postApp from './reducers'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import thunk from 'redux-thunk'
import Firebase from 'firebase'
import { FIREBASE_URL } from './firebase.js'
import { registerListeners } from './actions'

const store = compose(
  applyMiddleware(thunk)
)(createStore)(postApp, {
  firebase: new Firebase(FIREBASE_URL)
})
const history = createBrowserHistory()
syncReduxAndRouter(history, store)

store.dispatch(registerListeners())

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={PostApp} />
      <Route path="/:key" component={ViewPostUrl} />
    </Router>
  </Provider>,
  rootElement
)

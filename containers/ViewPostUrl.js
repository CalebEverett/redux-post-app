import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setViewPostKey } from '../actions'
import ViewPost from '../components/ViewPost'


export default class ViewPostUrl extends Component {
	componentWillMount () {
		const { dispatch, params } = this.props
		dispatch(setViewPostKey(params.key))
	}

  render () {
	  const { postToView } = this.props

		return (
		  <div >
			  <ViewPost postToView={postToView} />
		  </div>
	  )
	}
}

const mapStateToProps = (
  state
) => {
  console.log('mapStateToProps: ', state)
  return {
    postToView: Object.assign({}, {key: state.viewPostKey}, state.posts[state.viewPostKey])
  }
}

export default connect(mapStateToProps)(ViewPostUrl)

import React, { Component } from 'react'

export default class ViewPost extends Component {
  render () {
	  const { postToView } = this.props
		const post = postToView.body ? postToView : {key: "No Post Selected"}

		return (
		  <div >
			  <h2><a name="ViewPost" >Post to View</a></h2>
		    {Object.keys(post).map(key =>
		      <li key={key}>{key}: {post[key]}</li>
		    )}
		  </div>
	  )
	}
}

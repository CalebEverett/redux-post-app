import React, { Component } from 'react'
import marked from 'marked'

export default class ViewPost extends Component {
  render () {
	  const { postToView } = this.props
		const post = postToView.body ? postToView : {key: "No Post Selected"}

		return (
		  <div >
			  <h2><a name="ViewPost" >Post to View</a></h2>
			  {console.log(Object.keys(post))}
		    {Object.keys(post).map((key, i) =>
		      <li key={i}><span dangerouslySetInnerHTML={{__html: marked(post[key])}} /></li>
		    )}
		  </div>
	  )
	}
}

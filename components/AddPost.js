import React, { Component } from 'react'

export default class AddPost extends Component {
  render () {
  const { onSubmitAdd } = this.props
  let postContent = []

    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          postContent.title = this.refs.title.value
          postContent.body = this.refs.body.value
          postContent.url = this.refs.url.value
          if (postContent) {
            onSubmitAdd(postContent)
            this.refs.title.value = ''
            this.refs.body.value = ''
            this.refs.url.value = ''
          }
        }}>
          Title: <input type="text" ref="title" />
          Body: <textarea rows="5" ref="body" />
          Url: <input type="text" ref="url" />
          <button>
            Add
          </button>
        </form>
      </div>
    )
  }
}
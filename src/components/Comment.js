import React from "react"

const Comment = props => {
	const { comment } = props
	const { username } = comment

	return (
		<div className="content">
			<p>{username}</p>
			<p>{comment.comment}</p>
		</div>
	)
}

export default Comment
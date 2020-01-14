import React, {useState} from "react"
import { Button } from "react-bulma-components"
import { editCommentToPost, removeCommentsFromPost, updatePostInBlogPostsArray} from "../services/blogPostsServices"
import { useGlobalState} from "../config/store"


const Comment = props => {
	const { comment, showEditDelete, postId, history } = props
	const { username } = comment
	const [ editComment, setEditComment] = useState(false)
	const { store, dispatch} = useGlobalState()
	const {blogPosts} = store


	function changeComment(event) {
        event.preventDefault()
        const form = event.target
		const updatedComment = {
			_id: comment._id,
			comment: form.comment.value }
        if(updatedComment) {      
            // call to server to edit comments
                editCommentToPost(postId, updatedComment).then((response) => {			
                const updatedPost = response
                
                // update the state
                dispatch({
                    type: "setBlogPosts",
                    data: updatePostInBlogPostsArray(blogPosts, updatedPost)
                })
                setEditComment(false)
            }).catch((error) => {				
                console.log(`An error occurred updating the comments with id ${comment._id}: ${error}`)
            })
        }
	}
	
	function deleteComment() {
		// Delete the comment on the server
		removeCommentsFromPost(comment._id).then(() => {
			let post = blogPosts.filter((post) => post._id === postId)[0]
			const comments = post.comments.filter((review) => review._id !== comment._id)
			post.comments = comments
			// Update the state
			dispatch({
				type: "setBlogPosts",
				data: updatePostInBlogPostsArray(blogPosts, post)
			})
			history.push(`/posts/${postId}`)
		}).catch((error) => {
			console.log(`An error occurred deleting the comment: ${error}`)
		})		
    }

	return (
		<div>
		<div className="content">
			<p>{username}</p>
			<p>{comment.comment}</p>
			{showEditDelete && (<Button notification="true" color="info" onClick={() => {setEditComment(true)}}>Edit</Button>)}
			{showEditDelete && (<Button notification="true" color="info" onClick={() => {deleteComment(comment._id)}}>Delete</Button>)}
		</div>
		{editComment && 
            <form onSubmit={changeComment}>
				<input type="text" className="input" name="comment" defaultValue={comment.comment} placeholder="What's on your mind?" required></input>
				<input type="submit" value="Add Comment" className="button is-info"></input>
			</form>
		}
		</div>
	)
}

export default Comment
import React, {useState} from "react"
import { Heading, Button } from "react-bulma-components"
import Comment from "./Comment"
import {addCommentToPost, updatePostInBlogPostsArray} from "../services/blogPostsServices"
import {useGlobalState} from "../config/store"


const Comments = props => {

    function addNewComment(event) {
        event.preventDefault()
        const form = event.target
        const newComment = form.comment.value
        
        if(newComment) {      
            // call to server to add blog post
                addCommentToPost(postId,newComment).then((response) => {			
                const updatedPost = response
                
                // update the state
                dispatch({
                    type: "setBlogPosts",
                    data: updatePostInBlogPostsArray(blogPosts, updatedPost)
                })
                setAddingComment(false)
                history.push(`/posts/${postId}`)
            }).catch((error) => {				
                console.log(`An error occurred updating the post with id ${postId}: ${error}`)
            })
        }
        
    }

    const { comments, showAddComment, postId, history, showEditDelete} = props
    const [addingComment, setAddingComment] = useState(false)
    const {store, dispatch} = useGlobalState()
    const {blogPosts} = store
	
	return (
		<div >		
            <div className="level">
                <Heading className="level-left">Comments</Heading>
                {showAddComment && (<Button className="level-right" notification="true" color="info" onClick={() => {setAddingComment(true)}}>Add Comment</Button>)}
            </div>	
            {addingComment && 
                <form onSubmit={addNewComment}>
                    <label className="label">Comment</label>
                    <input type="text" className="input" name="comment" placeholder="What's on your mind?" required></input>
                    <input type="submit" value="Add Comment" className="button is-info"></input>
                </form>
            }
            {comments.map(comment => (
               <Comment key={comment._id} comment={comment} showEditDelete={showEditDelete} postId={postId} history={history}/>                                    
            ))}        
		</div>
	)
}

export default Comments
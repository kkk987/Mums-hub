import React, {Fragment} from "react"
import {Link} from "react-router-dom"
import { Button, Section, Heading } from "react-bulma-components"
import TimeAgo from 'react-timeago'
import Comments from "./Comments"
import { useGlobalState } from "../config/store"
import { removeBlogPost } from "../services/blogPostsServices"

const BlogPost = props => {

    function deleteBlogPost(id) {
		// Delete the blog post on the server
		removeBlogPost(id).then(() => {
			const posts = blogPosts.filter((post) => post._id !== id)
			// Update the state
			dispatch({
				type: "setBlogPosts",
				data: posts
			})
			// Redirect to my blog
            props.history.push(`/posts/?username=${loggedInUser}`)
            console.log("props history", props.history)
		}).catch((error) => {
			console.log(`An error occurred deleting the post: ${error}`)
		})		
    }
    
    const { blogPost, singlePost} = props
    const { store, dispatch } = useGlobalState()
    const { blogPosts, loggedInUser } = store
    const role  = loggedInUser ? loggedInUser.role : null
    const { title, username, content, comments, _id, modified_date } = blogPost
    // console.log("user role:", role)
    const showAddComment = true

    const showEditDelete = role ? ((role === "admin") && singlePost) : false
	
	return (
        <Fragment>
            <Section className="content">
                    <Link to={`/posts/${_id}`}>
                        <Heading>{title}</Heading>
                    </Link>
                    <p><TimeAgo date={modified_date} /></p>
                    <p>{content}</p>
            </Section>
            {showEditDelete && (
            <div className="level-right">
            <Button className="add-margin" color="info" onClick={() => props.history.push(`/posts/edit/${_id}`)}>Edit</Button>
            <Button className="add-margin" color="info" onClick={() => deleteBlogPost(_id)}>Delete</Button>
            </div>
        )}
            {/* Display comments if we are showing a single blog post */}
            {singlePost && (
                <Section className="content" >
                    <Comments {...props} postId={_id} comments={comments} showAddComment={showAddComment} showEditDelete={showEditDelete} />						
                </Section>
            )}
        </Fragment>
	)
}

export default BlogPost
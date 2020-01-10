import React from "react"
import { useGlobalState } from "../config/store"
import { addBlogPost } from "../services/blogPostsServices"

const BlogPostForm = (props) => {

	const { store, dispatch } = useGlobalState()
	const { blogPosts } = store
	
	function addNewBlogPost(event) {
		event.preventDefault()
		const form = event.target
		const post = {
			title: form.title.value,
			// category: form.category.value,
			content: form.content.value
		}
		// call to server to add blog post
		addBlogPost(post).then((response) => {			
			const newPost = response
			// update the state
			dispatch({
				type: "setBlogPosts",
				data: [...blogPosts, newPost]
			})
			props.history.push(`/posts/${newPost._id}`)
		}).catch((error) => {				
			console.log(`An error occurred adding the post: ${error}`)
			
		})
	}


    return (
		<form onSubmit={addNewBlogPost}>
			<label className="label">Title</label>
			<input type="text" className="input" name="title" placeholder="Title" required></input>
			<label className="label">Content</label>
			<textarea className="input" name="content" placeholder="What's on your mind?" required></textarea>
			<input type="submit" value="Create Post" className="button is-info"></input>
		</form>
	)

}

export default BlogPostForm
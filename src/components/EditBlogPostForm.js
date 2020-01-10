import React, {useState} from "react"
import { useGlobalState } from "../config/store"
import { updateBlogPost, getSingleBlogPost, updatePostInBlogPostsArray } from "../services/blogPostsServices"

const EditBlogPostForm = ({match, history}) => {

	const { store, dispatch } = useGlobalState()
	const { blogPosts, loggedInUser } = store

	const id = match.params ? match.params.id : null
	const post = getSingleBlogPost(blogPosts, id)
	
	const [values, setValues] = useState({
		title: post && post.title,
		category: post && post.category ? post.category : "",
		content: post && post.content
	})
	
	function editBlogPost(event) {
		event.preventDefault()
		const form = event.target
		const updatedPost = {
			_id: post._id,
			title: form.title.value,
			// category: form.category.value,
			content: form.content.value
		}

		// call to server to add blog post
		updateBlogPost(updatedPost).then((response) => {			
			const updatedPost = response
			
			// update the state
			dispatch({
				type: "setBlogPosts",
				data: updatePostInBlogPostsArray(blogPosts, updatedPost)
			})
			history.push(`/posts/${id}`)
		}).catch((error) => {				
			console.log(`An error occurred updating the post with id ${id}: ${error}`)
			history.push(`/posts/?username=${loggedInUser}`)
		})
	}

	function handleChange(event) {
		const target = event.target
		const value = target.value
		const name = target.name
		setValues({
			...values,
			[name]: value
		})
	}



    return (
		<form onSubmit={editBlogPost}>
			<label className="label">Title</label>
			<input type="text" className="input" name="title" placeholder="Title" value={values.title}required onChange={handleChange}></input>
			<label className="label">Content</label>
			<textarea className="input" name="content" placeholder="What's on your mind?" value={values.content} required onChange={handleChange}></textarea>
			<input type="submit" value="Update Post" className="button is-info"></input>
		</form>
	)

}

export default EditBlogPostForm
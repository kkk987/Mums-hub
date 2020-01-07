import React from "react"
import qs from "qs"
import BlogPost from "./BlogPost"
import { getBlogPost, getFilteredBlogPosts } from "../services/blogPostsServices"
import { useGlobalState } from "../config/store"

function haveQueryParameters(queryObj) {
	return Object.keys(queryObj).length > 0
}

function haveSinglePost(posts) {
	return posts.length === 1
}

const BlogPosts = (props) => {

	const { match, location } = props
	const { store } = useGlobalState()
	const { blogPosts, loggedInUser } = store
	const id = match.params && match.params.id
	const queryObj = qs.parse(location.search, { ignoreQueryPrefix: true })
	
	// Unless we are retrieving a single post, posts is all blogPosts (retrieved in App)
	let posts = blogPosts
	// If we have a post id, we only want to display the single post
	if(id) {
		posts = getBlogPost(blogPosts, id)
	}

	// If we have a query string, filter the blogPosts
	if(haveQueryParameters(queryObj)) {
		posts = getFilteredBlogPosts(posts, queryObj)
	}
	
	return (
		<div>
		{posts.map(post => (
			<BlogPost  {...props} key={post._id} blogPost={post} singlePost={haveSinglePost(posts)} loggedInUser={loggedInUser} />								
		))}
		</div>
	)
	
}

export default BlogPosts
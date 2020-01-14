import React from "react"
import qs from "qs"
import BlogPost from "./BlogPost"
import { getBlogPost, getFilteredBlogPosts } from "../services/blogPostsServices"
import { useGlobalState } from "../config/store"

function haveQueryParameters(queryObj) {
	return Object.keys(queryObj).length > 0
}

function haveSinglePost(posts) {
	return posts && posts.length === 1
}

const BlogPosts = (props) => {

	const { match, location } = props
    const { store } = useGlobalState()
    console.log("store", store)
    const { blogPosts, loggedInUser } = store 
    // console.log("Trying to read blogPosts from store : ")
    // console.log(blogPosts)
	const id = match.params && match.params.id
	const queryObj = qs.parse(location.search, { ignoreQueryPrefix: true })
	let posts = blogPosts
	

	if(id) {
		// If we have a post id, we only want to display the single post
		posts = getBlogPost(blogPosts, id)
	}
	if(haveQueryParameters(queryObj)) {
		// If we have a query string, filter the blogPosts
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
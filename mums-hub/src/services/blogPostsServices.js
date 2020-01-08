import api from "../config/api"

// Returns a single blog post with the specified id (in an array)
export const getBlogPost = (blogPosts, id) => {
    return blogPosts.filter(post => post._id === id)
}

export const getSingleBlogPost = (blogPosts, id) => {
    const posts = getBlogPost(blogPosts, id)
    return posts[0]
}

// Gets all blog posts from the server
export const getAllBlogPosts = async () => {
    try {
        const response = await api.get("/posts")
        return response.data
    } catch (error) {
        console.log("got an error from the server fetching blog posts:", error)
        throw(error)
    }
}

// Returns blog posts filtered by specified attributes
export const getFilteredBlogPosts = (blogPosts, filters) => {
    let filteredPosts = blogPosts
    for(let attr of Object.keys(filters)) {
        filteredPosts = filteredPosts.filter((post) => post[attr] === filters[attr])
    }
    return filteredPosts
}

// Adds a new blog post to the database
export const addBlogPost = async (newPost) => {
    // call to server to add new post   
    // will return the new post    
    try {
        const response = await api.post("/posts", newPost)
        return response.data
    }
    catch (error) {
        console.log("Error adding blog post:", error)
        throw(error)
    }
}

export const removeBlogPost = async (id) => {
    try {
        await api.delete(`/posts/${id}`)
    }
    catch(error) {
        console.log("Error deleting blog [post:", error)
        throw(error)
    }
}

export const updateBlogPost = async (post) => {
    try {
        const {_id} = post
        const response = await api.put(`/posts/${_id}`, post)
        return response.data
    }
    catch(error) {
        console.log("Error updating blog [post:", error)
        throw(error)
    }
}

export const updatePostInBlogPostsArray = (blogPosts, updatedPost) => {
    return blogPosts.map((post) => {
        if(post._id === updatedPost._id) {
            return updatedPost
        }
        return post
    })
}

export const addCommentToPost = async (postId, comment) => {
    try {
        const response = await api.post(`/posts/comments/${postId}`,{comment:comment})
        return response.data
    }
    catch(error) {
        console.log("Error adding comment:", error)
        throw(error)
    }
}
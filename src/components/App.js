import React,{useReducer, useEffect} from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import stateReducer from "../config/stateReducer"
import Nav from "./Nav"
import RegisterUser from "./SignUp"
import SignIn from "./SignIn"
import About from "./About"
import ImpDocs from "./ImpDocs"
import BlogPosts from "./BlogPosts"
import { getAllBlogPosts } from "../services/blogPostsServices"
import BlogPostForm from "./BlogPostForm"
import EditBlogPostForm from "./EditBlogPostForm"
import { userAuthenticated, loginUser, logoutUser } from "../services/authServices"
import {StateContext} from "../config/store"


const App = (props) => {

	// Set initial state
	const initialState = {
		loggedInUser: null,
		blogPosts: []
	}

	// Use reducer hook to handle state items
	const [store, dispatch] = useReducer(stateReducer,initialState)
	const {loggedInUser} = store
	// Get loggedInUser from localStorage
	function getLoggedInUser() {
		return localStorage.getItem("loggedInUser")
	}

	// Store loggedInUser username in local storage
	function setLoggedInUser(user) {
		user ? localStorage.setItem("loggedInUser", user) : localStorage.removeItem("loggedInUser")
	}

	function handleLogin(event, props) {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const password = form.elements.password.value
		// TBD: Authenticate with server. If successful:
		loginUser({username: username, password: password}).then((result) => {
			dispatch({
				type: "setLoggedInUser",
				data: username
			})
			setLoggedInUser(username)
			props.history.push("/posts")
		}).catch((error) => {
			console.log("error occurred")
		})
		
	}

	// handles logout
	// TODO: call server to log out
	function handleLogout() {
		logoutUser(loggedInUser)
		dispatch({ 
			type: "setLoggedInUser",
			data:  null 
		})
		setLoggedInUser(null)
		return <Redirect to="/#" />
	}
  
	useEffect(()=> {
       
		// If we have login information persisted, set the state
		dispatch({
			type: "setLoggedInUser",
			data: getLoggedInUser()
		})

		// Fetches blog posts from server and updates state
		function fetchBlogPosts() {
			getAllBlogPosts().then((response) => {
				const allPosts = response
				console.log("all posts from server:", allPosts)
				dispatch ({
					type: "setBlogPosts",
					data: allPosts
				})			
			}).catch((error) => {
				console.log(`oops! Something is wrong - check the server. We got an error: ${error}`)
			})		
		}
			fetchBlogPosts()
		// If we have login information persisted and we're still logged into the server, set the state
		userAuthenticated().then(() => {			 
			dispatch({
				type: "setLoggedInUser",
				data: getLoggedInUser()
			})
		}).catch((error) => {
			console.log("got an error trying to check authenticated user:", error)
			setLoggedInUser(null) 
			dispatch({
				type: "setLoggedInUser",
				data: null
			})
		})

        // return a function that specifies any actions on component unmount
		return () => {}
	}, [])

	return (
		
			<div className="container">	
			<StateContext.Provider value={{store,dispatch}} >			
				<BrowserRouter>
					<Nav loggedInUser={loggedInUser}/>
					{/* <Title /> */}
					<Switch>
						<Route exact path="/blogs" render ={ () => <Redirect to="/posts" />} />
						<Route exact path="/posts/new" component={BlogPostForm} />} />
						<Route exact path="/posts/edit/:id" component={EditBlogPostForm} />} />
						<Route exact path="/posts/:id" component={BlogPosts} />
						<Route exact path="/posts" component={BlogPosts} />
						<Route exact path="/auth/login" render={ (props) => <SignIn {...props} handleLogin={handleLogin}/> }/>
						<Route exact path="/auth/register" render={ (props) => <RegisterUser {...props} />} />
						<Route exact path="/auth/logout" render={() => handleLogout()} />
						<Route exact path="/about" component={About} />
						<Route exact path="/impDocs" component={ImpDocs} />
						
					</Switch>
				
				</BrowserRouter>
			</StateContext.Provider>
		</div>
		
	)
}
export default App
import React,{useReducer, useEffect} from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import stateReducer from "../config/stateReducer"
import Nav from "./Nav"
import RegisterUser from "./SignUp"
import SignIn from "./SignIn"
import { loginUser, logoutUser } from "../services/authServices"

const App = (props) => {

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
		const result = loginUser({username: username, password: password})
		dispatchLoggedInUser({
			type: "setLoggedInUser",
			data: username
		})
		setLoggedInUser(username)
		props.history.push("/posts")
	}

	// handles logout
	// TODO: call server to log out
	function handleLogout() {
		logoutUser(loggedInUser)
		dispatchLoggedInUser({ 
			type: "setLoggedInUser",
			data:  null 
		})
		setLoggedInUser(null)
		return <Redirect to="/#" />
	}
  // Use reducer hook to handle state items
	const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null)
		
	useEffect(()=> {
       
		// If we have login information persisted, set the state
		dispatchLoggedInUser({
			type: "setLoggedInUser",
			data: getLoggedInUser()
		})
        // return a function that specifies any actions on component unmount
		return () => {}
	}, [])

	return (
		
			<div className="container">				
				<BrowserRouter>
					<Nav loggedInUser={loggedInUser}/>
					{/* <Title /> */}
					<Switch>
						{/* <Route exact path="/" render ={ () => <Redirect to="/posts" />} /> */}
						
						<Route exact path="/auth/login" render={ (props) => <SignIn {...props} handleLogin={handleLogin}/> }/>
						<Route exact path="/auth/register" render={ (props) => <RegisterUser {...props} />} />
						<Route exact path="/auth/logout" render={() => handleLogout()} />
						
					</Switch>
				
			</BrowserRouter>
		</div>
		
	)
}
export default App
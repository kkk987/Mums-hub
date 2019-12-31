import React from "react"
import {registerUser} from "../services/authServices"

const RegisterUser = (props) => {

	function handleRegister(event) {
		console.log("in handleregister")
		event.preventDefault()
        const form = event.target
		const username = form.elements[0].value
		const email = form.elements[1].value
        const password = form.elements[2].value
        const dueDate = form.elements[3].value
		
		// TBD: Register user with server and redirect to login.
		registerUser({username: username, email: email, password: password, dueDate: dueDate})
		props.history.push("/auth/login")	
	}

	return (
		<form onSubmit={handleRegister}>
			<label className="label">Username</label>
			<input type="text" className="input" name="username" placeholder="Username" required></input>
            <label className="label">Email address</label>
			<input type="email" className="input" name="email" placeholder="Email" required></input>
			<label className="label">Password</label>
			<input type="password" className="input" name="password" placeholder="Password" required></input>
            <label className="label">Due Date</label> 
			<input type="date" className="input" name="duedate" placeholder="DueDate" required></input>
			<input type="submit" value="Register" className="button is-info"></input>

		</form>
	)
}

export default RegisterUser
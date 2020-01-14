import React from "react"
import {registerUser} from "../services/authServices"

const RegisterUser = (props) => {

	function handleRegister(event) {
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
		<form 
			data-cy="registerForm"
			onSubmit={handleRegister}
		>
			<label 
				className="label"
			>
				Username
			</label>
			<input 
				data-cy="username" 
				type="text" 
				className="input" 
				name="username" 
				placeholder="Username" 
				required
			>
			</input>
			<label 
				className="label"
			>
				Email address
			</label>
			<input 
				data-cy="email" 
				type="email" 
				className="input" 
				name="email" 
				placeholder="Email" 
				required
			>
			</input>
			<label 
				className="label"
			>
				Password
			</label>
			<input 
				data-cy="password" 
				type="password" 
				className="input" 
				name="password" 
				placeholder="Password" 
				required
			>
			</input>
			<label 
				className="label"
			>
				Due Date
			</label> 
			<input 
				data-cy="duedate" 
				type="date" 
				className="input" 
				name="duedate" 
				placeholder="DueDate" 
				required
			>
			</input>
			<input 
				data-cy="registerButton" 
				type="submit" 
				value="Register" 
				className="button is-info"
			>
			</input>
		</form>
	)
}

export default RegisterUser
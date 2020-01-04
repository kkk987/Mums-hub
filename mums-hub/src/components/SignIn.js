import React from "react"

const SignIn = props => {
	const { handleLogin } = props

	function loginUser(event) {
		handleLogin(event,props)
	}

	return (
		<form 
			data-cy="loginForm" 
			onSubmit={loginUser}
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
				required>
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
			<input 
				data-cy="loginButton" 
				type="submit" 
				value="Login" 
				className="button is-info"
			>
			</input>
		</form>
	)
}

export default SignIn
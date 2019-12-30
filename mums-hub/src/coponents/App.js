import React,{Fragment, useReducer, useEffect} from "react"
import stateReducer from "../config/stateReducer"
import Nav from "./Nav"

const App = () => {
  // Use reducer hook to handle state items
	const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null)
  return (
		
		<Fragment >
			<Nav loggedInUser={'Admin'}/>
		</Fragment>
		
	)

}

export default App;

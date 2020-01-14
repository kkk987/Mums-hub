import React, { Fragment, useState } from "react"
import { Navbar } from "react-bulma-components"
import { NavLink, Redirect } from "react-router-dom"
import { useGlobalState } from "../config/store"
import { logoutUser, setLoggedInUser } from "../services/authServices"

const Nav = (props) => {

   // handles logout
	function handleLogout() {
		logoutUser()
		dispatch({ 
			type: "setLoggedInUser",
			data:  null 
		})
        setLoggedInUser(null)
        hideMenu()
		return <Redirect to="/posts" />
	}

    // forces a state change to hide the hamburger menu
    function hideMenu() {
        setActive(false)
    }

    function navLoggedIn() {
        return (
            <Fragment>
            
                <Navbar.Container position="start">
                    <NavLink to="#" data-cy="logout" className="navbar-item" onClick={handleLogout}>Logout</NavLink>
                </Navbar.Container>
                <Navbar.Container position="end">

                        <NavLink to="/about" data-cy="about" className="navbar-item" onClick={hideMenu}>About</NavLink>
                        <NavLink to="/myProfile" data-cy="my-profile" className="navbar-item" onClick={hideMenu}>My Profile</NavLink>
                        <NavLink to="/blogs" data-cy="posts" className="navbar-item" onClick={hideMenu}>Blogs</NavLink>
                        {(loggedInUser.role === "admin") &&
                            <NavLink to="/posts/new" data-cy="new-post" className="navbar-item" onClick={hideMenu}>Add Post</NavLink>
                        }
                        <NavLink to="/impDocs" data-cy="imp-docs" className="navbar-item" onClick={hideMenu}>Important Documents</NavLink>
                        {/* <NavLink to={`/posts?username=${loggedInUser}`} className="navbar-item" onClick={hideMenu}>
                            My Blog
                        </NavLink> */}
                   
                </Navbar.Container>
            
            </Fragment>
        )
    }
    
    function navLoggedOut() {
        return (
            <Fragment>
                <Navbar.Container position="start">
                    <NavLink to="/auth/login" data-cy="login" className="navbar-item" onClick={hideMenu}>Login</NavLink>
                    <NavLink to="/auth/register" data-cy="register" className="navbar-item" onClick={hideMenu}>Register</NavLink>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <NavLink to="/about" data-cy="about" className="navbar-item" onClick={hideMenu}>About</NavLink>
                    <NavLink to="/blogs" data-cy="posts" className="navbar-item" onClick={hideMenu}>Blogs</NavLink>
                    <NavLink to="/impDocs" data-cy="imp-docs" className="navbar-item" onClick={hideMenu}>Important Documents</NavLink>
                </Navbar.Container>
            </Fragment>
        )
    }
    

    const [active, setActive] = useState(false)
    const { store, dispatch } = useGlobalState()
    const {loggedInUser} = store

    return (
        // active is stored in state, and used to toggle the hamburger menu  
        <Navbar data-cy="navbar" color="info" fixed="top"  active={active}>
            <Navbar.Brand data-cy="navbarBrand">
                <Navbar.Item renderAs="p">{loggedInUser ? loggedInUser.username : "guest"}</Navbar.Item>
                <Navbar.Burger data-cy="burger" onClick={() => {setActive(!active)}} />
            </Navbar.Brand>
            <Navbar.Menu>
                {/* Render the relevant NavLinks depending on whether or not a user is logged in  */}
                {loggedInUser ? navLoggedIn() : navLoggedOut()}
            </Navbar.Menu>
        </Navbar>
        
    )
}
export default Nav
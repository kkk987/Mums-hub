import React, { Fragment, useState } from "react"
import { Navbar } from "react-bulma-components"
import { NavLink } from "react-router-dom"

const Nav = (props) => {

    function hideMenu() {
        setActive(false)
    }

    function navLoggedIn() {
        return (
            <Fragment>
                <Navbar.Container 
                    position="start"
                >
                    <NavLink 
                        to="/auth/logout" 
                        data-cy="logout" 
                        className="navbar-item" 
                        onClick={hideMenu}
                    >
                        Logout
                    </NavLink>
                </Navbar.Container>
                <Navbar.Container 
                    position="end"
                >
                    <Navbar.Item 
                        href="#"
                    >
                        About
                    </Navbar.Item>
                    <Navbar.Item 
                        href="#"
                    >
                        Blogs
                    </Navbar.Item>
                    <Navbar.Item 
                        href="#"
                    >
                        My Profile
                    </Navbar.Item>
                    <Navbar.Item 
                        href="#"
                    >
                        Add Blogs
                    </Navbar.Item>
                    <Navbar.Item 
                        href="#"
                    >
                        Important Docs
                    </Navbar.Item>
                </Navbar.Container>
            </Fragment>
        )
    }

    function navLoggedOut() {
        return (
            <Fragment>
                <Navbar.Container position="start">
                    <NavLink 
                        data-cy="login" 
                        to="/auth/login" 
                        className="navbar-item" 
                        onClick={hideMenu}
                    >
                        Login
                    </NavLink>
                    <NavLink 
                        to="/auth/register" 
                        data-cy="register" 
                        className="navbar-item" 
                        onClick={hideMenu}
                    >
                        Register
                    </NavLink>
                </Navbar.Container>
                <Navbar.Container 
                    position="end"
                >
                    <Navbar.Item 
                        data-cy="About" 
                        href="#"
                    >
                        About
                    </Navbar.Item>
                    <Navbar.Item 
                        data-cy="Blogs" 
                        href="#"
                    >
                        Blogs
                    </Navbar.Item>
                </Navbar.Container>
            </Fragment>
        )
    }


    // The Nav component renders the nav bar at the top of the page
    // It is a class component data-cybecause it requires state to manage the hamburger menu toggle
    
        const [active, setActive] = useState(false)
        const {loggedInUser} = props
        console.log(`LoggedInUser: ${loggedInUser}`);
        return (
            // active is stored in state, and used to toggle the hamburger menu
            // const { loggedInUser } = this.props
            
                <Navbar 
                    data-cy="navbar" 
                    color="info" 
                    fixed="top"  
                    active={active}
                >
                    <Navbar.Brand 
                        data-cy="navbarBrand"
                    >
                        <Navbar.Item 
                            renderAs="p"
                        >
                            {loggedInUser || "guest"}
                        </Navbar.Item>
                        <Navbar.Burger 
                            onClick={() => {setActive(!active)}} 
                        />
                    </Navbar.Brand>
                    <Navbar.Menu>
                        {/* Render the relevant links depending on whether or not a user is logged in  */}
                        {loggedInUser ? navLoggedIn() : navLoggedOut()}
                    </Navbar.Menu>
                </Navbar>
            
        )
}
export default Nav
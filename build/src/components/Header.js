import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './../styles/header.css'

const Header =()=> {
    const [navClass, setNavClass] = useState(false);
    const handleNavClick =()=> {
        setNavClass(!navClass);
    }

    return(
        <div className="Header">
            <nav>
                <Link to="/" className="logo">
                    Vote
                </Link>
                <ul className={navClass?"navLinks navActive":"navLinks"}>
                    <li>
                        <NavLink activeClassName="linkNavBarActive" className="linkNavBar" onClick={handleNavClick} exact to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="linkNavBarActive" className="linkNavBar" onClick={handleNavClick} to="results">
                            Results
                        </NavLink>
                    </li>
                </ul>
                <ul className={navClass?"navLinks navActive navLinks2":"navLinks navLinks2"}>
                    <li>
                        <NavLink activeClassName="linkNavBarActive" className="linkNavBar" onClick={handleNavClick} to="signin">
                            Sign In
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="linkNavBarActive" className="linkNavBar" onClick={handleNavClick} to="signup">
                            Sign Up
                        </NavLink>
                    </li>
                </ul>
                    <div className="burger" onClick={handleNavClick}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
            </nav>
        </div>
    )
}

export default Header;
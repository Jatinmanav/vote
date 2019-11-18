import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './../styles/headerTwo.css'
import colors from '../ColorVariables'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AuthContext } from '../contexts/AuthContext';

const Header =()=> {
    const { auth, setLoggedOut } = useContext(AuthContext);
    const [navClass, setNavClass] = useState(false);
    const primaryColor = colors.fontColor1;
    const secondaryColor = colors.fontColor2;
    const thirdColor = colors.fontColor3;
    const backgroundColor = colors.backgroundColor1;

    const logoutHandleClick =()=> {
        console.log('Logout');
        setLoggedOut();
    }


    const theme = createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: colors.fontColor1,
        }
      },
    });

    const handleNavClick =()=> {
        setNavClass(!navClass);
    }

    return(
        <div className="Header">
            <ThemeProvider theme={theme}>
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
                        <NavLink activeClassName="linkNavBarActive" className="linkNavBar" onClick={handleNavClick} to="castvote">
                            Cast Vote
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
                            <Chip label="Logout" onClick={logoutHandleClick} variant="outlined" color="primary" icon={<FaceIcon />} />
                        </li>
                </ul>
                    <div className="burger" onClick={handleNavClick}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
            </nav>
            </ThemeProvider>
        </div>
    )
}

export default Header;
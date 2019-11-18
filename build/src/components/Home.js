import React, { useState, useContext } from 'react'
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn'
import Signin from './Signin'
import Signup from './Signup'
import Homepage from './Homepage';
import Castvote from './Castvote';
import About from './About';
import Result from './Result';
import colors from '../ColorVariables'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom';
import { AuthContextProvider, AuthContext } from '../contexts/AuthContext';

const Home =()=>{
    const backgroundImage = {
       backgroundColor: colors.backgroundColor1,
       overflow: 'hidden',
       height: '100vh',
    }
    const { auth, setAuthenticated } = useContext(AuthContext);

    return (
        <div>
            <Router>
                <div style={backgroundImage}>
                <div className='Header'>
                    {auth.isAuthenticated?<HeaderLoggedIn />:<Header />}
                    <Route exact path="/" render={()=> <Homepage />} />
                    <Route path="/about" render={()=> <About />} />
                    <Route path="/castvote" render={()=> auth.isAuthenticated?<Castvote />:<Redirect to="/signup" />} />
                    <Route path="/results" render={()=> <Result />} />
                    <Route path="/signin" render={()=> auth.isAuthenticated?<Redirect to="/" />:<Signin />} />
                    <Route path="/signup" render={()=> auth.isAuthenticated?<Redirect to="/" />:<Signup />} />
                </div>
                </div>
            </Router>
        </div>
    )
}


export default Home;
import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider =(props)=> {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        userName: "",
    });

    const setAuthenticated =(name)=> {
        setAuth({
            isAuthenticated: true,
            userName: name,
        })
    }

    const setLoggedOut =()=> {
        setAuth({
            isAuthenticated: false,
            userName: "",
        })
    }

    return (
        <AuthContext.Provider value={{auth, setAuthenticated, setLoggedOut}}>
            {props.children}
        </AuthContext.Provider>
    );
}
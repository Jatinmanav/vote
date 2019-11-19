import React, { createContext, useState } from 'react'

export const AuthContext = createContext();


export const AuthContextProvider =(props)=> {

    function useLocalStorage(key, initialValue) {
        const [storedValue, setStoredValue] = useState(() => {
          try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
          } catch (error) {
            console.log(error);
            return initialValue;
          }
        });
    
        const setValue = value => {
          try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            console.log(error);
          }
        };
        return [storedValue, setValue];
    }

    const [auth, setAuth] = useState({
        isAuthenticated: false,
        userName: "",
    });

    const [jwt, setJwt] = useLocalStorage('jwt', null);
    const [userData, setUserData] = useLocalStorage('userData', null);

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
        setJwt(null);
        setUserData(null);
    }

    return (
        <AuthContext.Provider value={{auth, userData, setAuthenticated, setLoggedOut, jwt, setJwt, setUserData}}>
            {props.children}
        </AuthContext.Provider>
    );
}
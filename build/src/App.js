import React from 'react';
import Home from './components/Home'
import { AuthContextProvider } from './contexts/AuthContext';

const App =()=> {
  return (
    <div className="App">
      <AuthContextProvider>
        <Home />
      </AuthContextProvider>
    </div>
  );
}

export default App;

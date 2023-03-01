import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthContext } from './context/auth.context';
import { AuthContextInterface } from './@types/authContext.type';

function App() {

  const {authenticateUser, isLoading, isLoggedIn, user} = useContext(AuthContext) as AuthContextInterface
  return (
    <div className="App">
      
    </div>
  );
}

export default App;

import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthContext } from './context/auth.context';
import { AuthContextInterface } from './@types/authContext.type';
import ListPanel from './components/ListPanel';

function App() {

  const {authenticateUser, isLoading, isLoggedIn, user} = useContext(AuthContext) as AuthContextInterface
  useEffect(()=>{
    console.log(user)
  },[user])
  return (
    <div className="App">
      <ListPanel/>
      <h1>App</h1>
    </div>
  );
}

export default App;

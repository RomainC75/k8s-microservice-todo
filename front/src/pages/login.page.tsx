import React, { FormEvent, useState, ChangeEvent, useContext } from "react";
import { TextField, Button } from "@mui/material";
import "./styles/login.css";
import { LoginInterface, UserInterface } from "../@types/authContext.type";
import { AuthContext } from "../context/auth.context";
import { AuthContextInterface } from "../@types/authContext.type";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const { authenticateUser, isLoading, isLoggedIn, user, API_URL, storeToken } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const navigate = useNavigate()
  const [inputsState, setInputsState] = useState<LoginInterface>({
    email: "",
    password: "",
  });
  const [isLoginValid, setIsLoginValid] = useState<boolean>(false);
  const [isLoginError, setIsLoginError] = useState<boolean>(false);

  const handleInputs = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target && "value" in e.target && "name" in e.target) {
        setIsLoginError(false)
      const newValues: LoginInterface = {
        ...inputsState,
        [e.target.name]: e.target.value,
      };
      setInputsState(newValues);
      if (Object.values(newValues).includes("")) {
        setIsLoginValid(false);
      } else {
        setIsLoginValid(true);
      }
    }
  };

  const handleForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signin`, inputsState)
      .then((ans) => {
        storeToken(ans.data.token)
        authenticateUser()
        navigate('/')
      })
      .catch((err) => {
        setIsLoginError(true)
      });
  };

  return (
    <div className="LoginPage">
      <h1>LoginPage</h1>
      <form onSubmit={handleForm}>
        <TextField
          id="email"
          name="email"
          label="email"
          variant="filled"
          value={inputsState.email}
          onChange={handleInputs}
        />
        <TextField
          id="password"
          name="password"
          label="password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={inputsState.password}
          onChange={handleInputs}
        />
        <Button variant="contained" type="submit" disabled={!isLoginValid}>
          Login
        </Button>
        {isLoginError && 
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        wrong email or password
      </Alert>
      }
      </form>
    </div>
  );
};

export default LoginPage;

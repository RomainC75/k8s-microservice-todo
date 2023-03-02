import React, { FormEvent, useState, ChangeEvent, useContext } from "react";
// import { TextField, Button } from "@mui/material";
import { PurpleButton, PurpleTextField } from "../utils/mui-custom-colors";
import "./styles/signup.css";
import {
  LoginInterface,
  SignupFullInterface,
  SignupInterface,
  UserInterface,
} from "../@types/authContext.type";
import { AuthContext } from "../context/auth.context";
import { AuthContextInterface } from "../@types/authContext.type";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { detailsAboutNeededCharactersInPass, isEmailValidFn, isPasswordValidFn } from "../utils/signugFieldsTests";

const Signup = (): JSX.Element => {
  const { authenticateUser, isLoading, isLoggedIn, user, API_URL, storeToken } =
    useContext(AuthContext) as AuthContextInterface;
  const navigate = useNavigate();
  const [inputsState, setInputsState] = useState<SignupFullInterface>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    emailConf: "",
    passwordConf: "",
  });
  // const [isSignupValid, setIsSignupValid] = useState<boolean>(false);
  const [isSignupError, setIsSignupError] = useState<boolean>(false);

  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(true);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(true);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordsEquals, setIsPasswordsEquals] = useState<boolean>(true);
  const [isEmailsEquals, setIsEmailsEquals] = useState<boolean>(true);

  const handleInputs = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target && "value" in e.target && "name" in e.target) {
      setIsSignupError(false);
      const newValues: SignupFullInterface = {
        ...inputsState,
        [e.target.name]: e.target.value,
      };
      setInputsState(newValues);

      setIsFirstNameValid(newValues.firstname.length > 0);
      setIsLastNameValid(newValues.lastname.length > 0);

      setIsEmailValid(isEmailValidFn(newValues.email));
      setIsEmailsEquals(newValues.email === newValues.emailConf);

      setIsPasswordValid(isPasswordValidFn(newValues.password));
      setIsPasswordsEquals(newValues.password === newValues.passwordConf);
      console.log('new Value : ', newValues)
      console.log('==<=', isFirstNameValid, isLastNameValid, isEmailValid, isEmailsEquals)
    }
  };

  const handleForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signup`, inputsState)
      .then((ans) => {
        storeToken(ans.data.token);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        setIsSignupError(true);
      });
  };

  return (
    <div className="Signup">
      <h1>Signup</h1>
      <form onSubmit={handleForm}>
        <PurpleTextField
          id="firstname"
          name="firstname"
          label="firstname"
          variant="outlined"
          value={inputsState.firstname}
          onChange={handleInputs}
          helperText={!isFirstNameValid && "need a first name"}
          error={!isFirstNameValid}
        />
        <PurpleTextField
          id="lastname"
          name="lastname"
          label="lastname"
          variant="outlined"
          value={inputsState.lastname}
          onChange={handleInputs}
          helperText={!isLastNameValid && "need a last name"}
          error={!isLastNameValid}
        />
        <PurpleTextField
          id="email"
          name="email"
          label="email"
          variant="outlined"
          value={inputsState.email}
          onChange={handleInputs}
          helperText={!isEmailValid && "need a valid email"}
          error={!isEmailValid}
        />
        <PurpleTextField
          id="emailConf"
          name="emailConf"
          label="email confirmation"
          variant="outlined"
          value={inputsState.emailConf}
          onChange={handleInputs}
          helperText={!isEmailsEquals && "need the same email"}
          error={!isEmailsEquals}
        />
        <PurpleTextField
          id="password"
          name="password"
          label="password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={inputsState.password}
          onChange={handleInputs}
          helperText={!isPasswordValid && detailsAboutNeededCharactersInPass(inputsState.password)}
          error={!isPasswordValid}
        />

        <PurpleTextField
          id="passwordConf"
          name="passwordConf"
          label="password confirmation"
          type="password"
          autoComplete="current-passwordConf"
          variant="outlined"
          value={inputsState.passwordConf}
          onChange={handleInputs}
          helperText={!isPasswordsEquals && "need the same password"}
          error={!isPasswordsEquals}
        />
        <PurpleButton
          variant="contained"
          type="submit"
          disabled={
            !isFirstNameValid ||
            !isLastNameValid ||
            !isEmailValid ||
            !isEmailsEquals ||
            !isPasswordValid ||
            !isPasswordsEquals
          }
        >
          Login
        </PurpleButton>
        {isSignupError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            wrong email or password
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Signup;

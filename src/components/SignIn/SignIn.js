import React from "react";

import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";

import { auth, SignInWithGoogle } from "../../firebase/firebase.utils";

import "./SignIn.scss";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  onSubmitHandler = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  onChangeHandler = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="sign-in">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.onSubmitHandler}>
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={this.onChangeHandler}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={this.onChangeHandler}
            label="Password"
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={SignInWithGoogle}
              isGoogleSignIn
            >
              Google Sign In
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;

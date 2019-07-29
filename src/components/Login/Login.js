import React from "react";

import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../Layout/Layout";

import {
  signInExistingUser,
  signUpNewUser,
  socialSignin,
  removeAuthError
} from "../../store/actions/auth";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authUser = this.authUser.bind(this);
    this.signInWithSocial = this.signInWithSocial.bind(this);
  }
  state = {
    email: "",
    password: "",
    isLogin: true
  };

  handleChange(e) {
    let newState = { ...this.state };
    newState[`${e.target.name}`] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.authUser();
  }

  authUser() {
    const { signIn, signUp } = this.props;

    if (this.state.isLogin) {
      signIn(this.state.email, this.state.password);
    } else {
      signUp(this.state.email, this.state.password);
    }
  }

  signInWithSocial() {
    const { socialSignin } = this.props;
    socialSignin();
  }

  render() {
    const { authError, removeAuthError } = this.props;
    console.log("process.env", process.env);
    return (
      <Layout>
        <div className={styles.loginContainer}>
          <h1 className={`title is-4 ${styles.screenTitle}`}>
            {this.state.isLogin ? "Login" : "Sing Up"}
          </h1>
          {authError ? (
            <div className="notification is-danger">
              <button className="delete" onClick={() => removeAuthError()} />
              <h4 className="title is-5">Authentication Error!</h4>
              {authError.message}
            </div>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-large"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="envelope" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className={`control has-icons-left`}>
                <input
                  className={`input is-large`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  type="submit"
                  className={`button is-success ${styles.btn}`}
                >
                  {this.state.isLogin ? "Login" : "SignUp"}
                </button>
              </p>
            </div>
          </form>
          <div>
            {this.state.isLogin ? (
              <p className={styles.text}>
                Dont have an account?{" "}
                <span
                  className={styles.switchText}
                  onClick={() => this.setState({ isLogin: false })}
                >
                  SignUp
                </span>
              </p>
            ) : (
              <p className={styles.text}>
                Already a user ?{" "}
                <span
                  className={styles.switchText}
                  onClick={() => this.setState({ isLogin: true })}
                >
                  Login
                </span>
              </p>
            )}
          </div>
          <div className={styles.btnContainer}>
            <button
              className={`button ${styles.google} ${styles.btn}`}
              onClick={this.signInWithSocial}
            >
              <span className="icon is-medium">
                <FontAwesomeIcon icon={["fab", "google"]} />
              </span>
              <span>Login With Google</span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(signInExistingUser(email, password)),
    signUp: (email, password) => dispatch(signUpNewUser(email, password)),
    socialSignin: () => dispatch(socialSignin()),
    removeAuthError: () => dispatch(removeAuthError())
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    authError: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

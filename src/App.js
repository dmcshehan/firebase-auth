import "../node_modules/bulma/css/bulma.css";

import React from "react";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

import { connect } from "react-redux";

import { checkExistingUser } from "./store/actions/auth";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    user: null,
    loading: true
  };

  componentDidMount() {
    const { checkExistingUser } = this.props;
    checkExistingUser();
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <div className="App">{user ? <Home /> : <Login />}</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkExistingUser: () => dispatch(checkExistingUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

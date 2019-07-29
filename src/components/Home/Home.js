import React from "react";
import Layout from "../Layout/Layout";
import { connect } from "react-redux";

import styles from "./home.module.css";
import placeholder from "../../resources/img/placeholder.jpg";

const Home = ({ user }) => {
  console.log(user);
  return (
    <Layout>
      <div className={styles.welcome}>
        <h1 className="title is-1">Welcome</h1>
        {user.displayName ? (
          <h2 className="title is-5">{`${user.displayName}`}</h2>
        ) : null}

        {user.photoURL ? (
          <figure className="image is-128x128">
            <img src={user.photoURL} alt="profile pic" className="is-rounded" />
          </figure>
        ) : (
          <figure className="image is-128x128">
            <img src={placeholder} alt="profile pic" className="is-rounded" />
          </figure>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);

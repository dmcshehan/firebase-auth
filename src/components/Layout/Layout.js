import React from "react";
import { connect } from "react-redux";
import { logoutCurrentUser } from "../../store/actions/auth";
import styles from "./layout.module.css";
//keep these at last
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faEnvelope, faLock);

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    const { logOut } = this.props;
    logOut();
  }

  render() {
    const { children, user } = this.props;
    return (
      <div className={styles.wrapper}>
        {user ? (
          <>
            <section
              className="section"
              style={{ paddingTop: 20, paddingBottom: 20 }}
            >
              <header>
                <nav
                  className="navbar"
                  role="navigation"
                  aria-label="main navigation"
                >
                  <div className="container">
                    <div
                      className="navbar-brand"
                      style={{ alignItems: "center", marginLeft: 0 }}
                    >
                      <h2 className="title is-4">Fire Auth</h2>
                    </div>
                    <div className="navbar-end">
                      <div className="navbar-item">
                        <div className="buttons">
                          <button
                            className="button is-primary"
                            onClick={this.logoutHandler}
                          >
                            <strong>Logout</strong>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </header>
            </section>

            <div className="section">
              <div className="container">{children}</div>
            </div>
          </>
        ) : (
          <div className="section">
            <div className="container">{children}</div>
          </div>
        )}
      </div>
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
    logOut: () => dispatch(logoutCurrentUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

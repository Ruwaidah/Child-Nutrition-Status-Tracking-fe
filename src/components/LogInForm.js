import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logInaction, userInfo } from "../actions";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

function LogInForm(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      props.userInfo(sessionStorage.getItem("userId"));
      // props.history.push(`/${sessionStorage.getItem("username")}`);
    }
  }, []);

  const onchange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onLogin = (event) => {
    event.preventDefault();
    props.logInaction(values, props.history);
    // history.push("/test");
  };

  const useStyles = makeStyles({
    root: {
      fontFamily: "Roboto",
      width: "100%",
      margin: "5%",
      display: "flex",
      justifyContent: "space-between",
      background: "none",
    },

    headline: {
      margin: "2%",
      paddingTop: "2%",
      fontSize: "3rem",
      color: "white",
      background: "none",
    },

    subtitle: {
      margin: "2%",
      fontSize: "1.8rem",
      color: "white",
      width: "100%",
      background: "none",
    },
  });
  const classes = useStyles();
  return (
    <div className="container">
      {sessionStorage.getItem("token") ? (
        <Redirect to={`/${sessionStorage.getItem("username")}`} />
      ) : null}{" "}
      <>
        <div className={`${classes.root} header`}>
          <div>
            <h1 className={classes.headline}>MALO </h1>
            <h3 className={classes.subtitle}>
              International Child Nutrition Status Tracker
            </h3>
          </div>
        </div>
        <div className="loginDiv">
          <h3>Login</h3>
          {props.error ? <p className="error">{props.error}</p> : null}
          <form onSubmit={onLogin}>
            <div className="line">
              <label htmlFor="username">UserName </label>
              <input
                id="username"
                name="username"
                placeholder="username"
                onChange={onchange}
                value={values.username}
              />
            </div>
            <div className="line">
              <label htmlFor="password">Password </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={onchange}
                value={values.password}
              />
            </div>
            <button>LogIn</button>
          </form>
          <p className="forgot">
            forgot your password? <Link to="">Reset Password</Link>
          </p>
        </div>
      </>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    error: state.error,
  };
};
export default connect(mapStatetoProps, { logInaction, userInfo })(LogInForm);

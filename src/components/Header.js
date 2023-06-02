import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { cleaning } from "../actions";

function Header(props) {
  const OnLogOut = () => {
    sessionStorage.clear();
    props.cleaning();
    props.history.push("/");
  };
console.log(props.user)
  return (
    <div className="nav">
      <div className="malo">
        <h1>MALO </h1>
        <h3>International Child Nutrition Status Tracker</h3>
      </div>
      {props.user ? (
        sessionStorage.getItem("isAdmin") ? (
          <div className="nav-btn">
            <NavLink
              to={`/${sessionStorage.getItem("username")}/admin/show-users`}
            >
              Users
            </NavLink>
            <NavLink exact to={`/${sessionStorage.getItem("username")}/admin`}>
              Countries
            </NavLink>
          </div>
        ) : (
          <div className="nav-btn">
            <h3 className="user-nav">
              {props.user.country_name.toUpperCase()}
            </h3>
          </div>
        )
      ) : null}

      <div className="logout">
        <button onClick={OnLogOut}>LogOut</button>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStatetoProps, { cleaning })(Header);

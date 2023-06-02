import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { userInfo, allUser } from "../actions";
import Communities from "./Communities";
import Countries from "./Countries";
import { Link, Redirect } from "react-router-dom";

function Menu(props) {
  useEffect(() => {
    props.userInfo(sessionStorage.getItem("userId"));
  }, []);

  if (!props.user || !props.user.country_id) return <p>Loading</p>;

  return (
    <div>
      {props.user.isAdmin ? (
        <div>
          {/* <Countries history={props.history} /> */}
          <Redirect to={`/${sessionStorage.getItem("username")}/admin`} />
        </div>
      ) : (
        <Redirect
          to={`/${sessionStorage.getItem("username")}/user/${
            props.user.country_name
          }/${props.user.country_id}`}
        />
        // <Communities {...props} />
      )}
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    loading: state.isloading,
    user: state.user,
  };
};

export default connect(mapStatetoProps, { userInfo })(Menu);

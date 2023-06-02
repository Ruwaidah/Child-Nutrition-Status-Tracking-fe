import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../actions";

function CreateAUser(props) {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    country_name: "",
    isAdmin: 0,
  });
  const onChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    props.createUser(user, props.history);
    props.history.push(
      `/${sessionStorage.getItem("username")}/admin/show-users`
    );
  };
  return (
    <div className="edite-compo">
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="firstname">First Name: </label>
          <input name="firstname" id="firstname" onChange={onChange} />
        </div>
        <div className="field">
          <label htmlFor="lastname">Last Name: </label>
          <input name="lastname" id="lastname" onChange={onChange} />
        </div>
        <div className="field">
          <label htmlFor="username">UserName: </label>
          <input name="username" id="username" onChange={onChange} />
        </div>
        <div className="field">
          <label htmlFor="email">Email : </label>
          <input name="email" id="email" onChange={onChange} />
        </div>
        <div className="field">
          <label htmlFor="password">Password : </label>
          <input name="password" id="password" onChange={onChange} />
        </div>
        <div className="field">
          <label htmlFor="Country">Country : </label>
          <input name="country_name" id="Country" onChange={onChange} />
        </div>
        <div className="field">
          <label>User Type:</label>
          <select name="isAdmin" onChange={onChange}>
            <option value="1">Globel Admin</option>
            <option value="0">Country Admin</option>
          </select>
        </div>
        <div className="sub-cancel">
          <button>Submit</button>
          <button
            onClick={(event) => {
              event.preventDefault();
              props.history.goBack();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    username: state.user,
    userAllInfo: state.userInfo,
  };
};

export default connect(mapStatetoProps, { createUser })(CreateAUser);

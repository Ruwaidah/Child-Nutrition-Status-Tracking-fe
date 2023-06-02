import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editeUser, deleteUser, userInfo } from "../actions";

function ShowUser(props) {
  const id = props.match.params.id;
  let check = false;
  const [edite, setEdite] = useState(false);
  const [gettheUSer, setUser] = useState(props.user);
  const [submitted, setSubmit] = useState(false);

  useEffect(() => {
    props.userInfo(id);
    check = !check;
    setUser(props.user);
  }, [submitted, edite]);

  if (props.user) {
    check = !check;
  }

  useEffect(() => {
    setUser(props.user);
  }, [check, edite]);

  const onChange = (event) => {
    setUser({
      ...gettheUSer,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.editeUser(props.user.id, gettheUSer);
    setEdite(false);
    setSubmit(!submitted);
  };

  if (!props.user) return <h3>Loading</h3>;
  return (
    <div>
      <div className="alllist">
        <div className="field">
          <h5>Username: </h5>
          {edite ? (
            <input
              id="username"
              name="username"
              onChange={onChange}
              value={gettheUSer.username}
            />
          ) : (
            <p>{props.user.username}</p>
          )}
        </div>
        <div className="field">
          <h5>First Name: </h5>
          {edite ? (
            <input
              id="firstname"
              name="firstname"
              onChange={onChange}
              value={gettheUSer.firstname}
            />
          ) : (
            <p>{props.user.firstname}</p>
          )}
        </div>

        <div className="field">
          <h5>Last Name: </h5>
          {edite ? (
            <input
              id="lastname"
              name="lastname"
              onChange={onChange}
              value={gettheUSer.lastname}
            />
          ) : (
            <p>{props.user.lastname}</p>
          )}
        </div>

        <div className="field">
          <h5>Email: </h5>
          {edite ? (
            <input
              id="email"
              name="email"
              value={gettheUSer.email}
              onChange={onChange}
            />
          ) : (
            <p>{props.user.email}</p>
          )}
        </div>

        <div className="field">
          <h5>Country: </h5>
          {edite ? (
            <input
              id="country"
              name="country_name"
              value={gettheUSer.country_name}
              onChange={onChange}
            />
          ) : (
            <p>{props.user.country_name}</p>
          )}
        </div>

        {edite ? (
          <div className="field">
            {gettheUSer.isAdmin === 1 ? (
              <>
                <h5>User Type: </h5>
                <select name="isAdmin" onChange={onChange}>
                  <option value="1" selected={true}>
                    Globel Admin
                  </option>
                  <option value="0">Country Admin</option>
                </select>
              </>
            ) : (
              <>
                <h5>User Type: </h5>
                <select name="isAdmin" onChange={onChange}>
                  <option value="1">Globel Admin</option>
                  <option value="0" selected={true}>
                    Country Admin
                  </option>{" "}
                </select>
              </>
            )}
          </div>
        ) : (
          <div className="field">
            <h5>User Type: </h5>
            {props.user.isAdmin === 1 ? (
              <p> Globel Admin </p>
            ) : (
              <p> Country Admin </p>
            )}
          </div>
        )}
        {edite ? (
          <>
            <div className="del-edite">
              {" "}
              <button type="submit" onClick={(e) => onSubmit(e)}>
                Edite
              </button>
              <button onClick={() => setEdite(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="del-edite">
              <button
                onClick={() => {
                  props.deleteUser(gettheUSer.id);
                  props.history.push(
                    `${sessionStorage.getItem("username")}/admin/show-users`
                  );
                }}
              >
                Delete
              </button>
              <button onClick={() => setEdite(true)}>Edite</button>
            </div>
          </>
        )}
      </div>
      )}
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    allusers: state.allusers,
  };
};
export default connect(mapStatetoProps, { editeUser, deleteUser, userInfo })(
  ShowUser
);

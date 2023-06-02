import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ChildView from "./ChildView";
import { getRecords, userInfo } from "../actions/index.js";
import color from "@material-ui/core/colors/amber";

function Children(props) {
  let community_id = props.match.params.communityid;
  useEffect(() => {
    props.getRecords(community_id);
    props.userInfo(sessionStorage.getItem("userId"));
  }, []);

  if (!props.records) return <h1>Loading</h1>;

  return (
    <div className="list-div">
      <div className="childs-list">
        <h2>Children List</h2>
        {props.records.map((child) => (
          <div className="child">
            <Link to={`record/${child.id}`}> {child.childName}</Link>
          </div>
        ))}
      </div>
      <div className="addChild">
        <Link to={`add/child`}>add Child</Link>
      </div>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    isloading: state.isloading,
    communities: state.communities,
    records: state.records,
  };
};
export default connect(mapStatetoProps, { getRecords, userInfo })(Children);

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getChildRecord,
  userInfo,
  addingChildRecord,
} from "../actions/index.js";
import RecordsChart from "./RecordsChart.js";

function ChildView(props) {
  var day = new Date();
  var dd = String(day.getDate()).padStart(2, "0");
  var mm = String(day.getMonth() + 1).padStart(2, "0");
  var yyyy = day.getFullYear();
  day = yyyy + "-" + mm + "-" + dd;

  const childId = props.match.params.childid;
  const comId = props.match.params.communityid;
  const [values, setValues] = useState({
    weight: "",
    height: "",
    description: "",
    child_id: childId,
    date: day,
  });
console.log(props.childTrack)
  const [isOpen, setIsOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    props.getChildRecord(comId, childId);
    props.userInfo(sessionStorage.getItem("userId"));
  }, []);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsOpen(false);
    console.log(values, childId)
    props.addingChildRecord(values, childId);
  };

  if (!props.child || !props.childTrack) return <h3>Loading</h3>;
  return (
    <div className="childView">
      <div className="child-profile">
        <div className="field">
          <h5>CHILD'S NAME: </h5>
          <p>{props.child.childName}</p>
        </div>
        <div className="field">
          <h5>DATE OF BIRTH:</h5>
          <p>{props.child.birth}</p>
        </div>
        <div className="field">
          <h5> GENDER :</h5>
          <p>{props.child.gender}</p>
        </div>
        <div className="field">
          <h5>HEIGHT:</h5>
          <p>{props.child.height}</p>
        </div>
        <div className="field">
          {" "}
          <h5>WEIGHT:</h5>
          <p>{props.child.weight}</p>
        </div>
        <div className="field">
          {" "}
          <h5>COUNTRY OF SCREENING:</h5>
          <p>{props.child.country_name}</p>
        </div>
        <div className="field">
          <h5> DATE OF SCREENING:</h5>
          <p>{props.child.screenDate}</p>
        </div>
        <div className="field">
          <h5>PARENTS' NAMES:</h5>
          <p>{props.child.parentName}</p>
        </div>
        <div className="field">
          <h5>PHONE NUMBER :</h5>
          <p>{props.child.phoneNo}</p>
        </div>
        <div className="field">
          <h5>Street Address :</h5>
          <p>{props.child.street}</p>
        </div>
        <div className="field">
          <h5>COMMUNITY NAME :</h5>
          <p>{props.child.community_name}</p>
        </div>
      </div>
      {isOpen ? (
        <div className="adding-newRecord">
          <h2>Adding New Record</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="weight">Weight</label>
              <input
                id="weight"
                type="text"
                name="weight"
                placeholder="weight"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="height">Height</label>
              <input
                id="height"
                type="text"
                name="height"
                placeholder="height"
                onChange={onChange}
              />
            </div>
            <div id="adding-des">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                type="text"
                name="description"
                placeholder="type here .."
                onChange={onChange}
              />
            </div>
            <div id="adding-record-btns">
              <button type="submit">add record</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="addrecord">
          <Link to={`${childId}`} onClick={() => setIsOpen(true)}>
            add Record
          </Link>
        </div>
      )}

   {props.childTrack.length>0 && <div className="childTrack">
        {viewAll ? (
          props.childTrack.map((data, index) => (
            <div className="record-container">
              <div className="field date">
                <h5>Date:</h5>
                <p>{data.date}</p>
              </div>
              <div className="record">
                <div className="field">
                  <h5>Weight:</h5>
                  <p>{data.weight}</p>
                </div>
                <div className="field">
                  <h5>Height:</h5>
                  <p>{data.height}</p>
                </div>
                <div className="field disc">
                  <h5>Description:</h5>
                  <p>{data.description}</p>
                </div>
              </div>
              {index == props.childTrack.length - 1 ? (
                <p className="viewallrecords" onClick={() => setViewAll(false)}>
                  View only last record
                </p>
              ) : null}
            </div>
          ))
        ) : (
          <div className="record-container">
            <div className="field date">
              <h5>Date:</h5>
              <p>{props.childTrack[0].date}</p>
            </div>
            <div className="record">
              <div className="field">
                <h5>Weight:</h5>
                <p>{props.childTrack[0].weight}</p>
              </div>
              <div className="field">
                <h5>Height:</h5>
                <p>{props.childTrack[0].height}</p>
              </div>
              <div className="field disc">
                <h5>Description:</h5>
                <p>{props.childTrack[0].description}</p>
              </div>
            </div>
            <p className="viewallrecords" onClick={() => setViewAll(true)}>
              View all records
            </p>
          </div>
        )}
      </div> }   
      <RecordsChart />
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    isloading: state.isloading,
    child: state.child,
    childTrack: state.childTrack,
  };
};
export default connect(mapStatetoProps, {
  userInfo,
  getChildRecord,
  addingChildRecord,
})(ChildView);

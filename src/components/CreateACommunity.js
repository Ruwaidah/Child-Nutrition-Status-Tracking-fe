import React, { useState, useEffect } from "react";
import { createCommunity } from "../actions/index.js";
import { connect } from "react-redux";

function CreateACommunity(props) {
  const [community, setCommunity] = useState({
    country_id: props.match.params.country_id,
    community_name: "",
  });

  const onChange = (event) => {
    setCommunity({ ...community, community_name: event.target.value });
  };

  onsubmit = (event) => {
    event.preventDefault();
    props.createCommunity(community);
    props.history.goBack();
    setCommunity({
      community_name: "",
    });
  };
  return (
    <div>
      <form className="editeForm">
        <div>
          <label htmlFor="community_name">Community name:</label>
          <input
            id="community_name"
            placeholder="country name"
            name="community_name"
            onChange={onChange}
          />
        </div>
        <div>
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
    user: state.user,
  };
};

export default connect(mapStatetoProps, { createCommunity })(CreateACommunity);

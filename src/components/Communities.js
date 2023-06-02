import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { countryFetch, userInfo } from "../actions";

function Communities(props) {
  useEffect(() => {
    props.countryFetch(props.match.params.country_id);
    props.userInfo(sessionStorage.getItem("userId"));
  }, []);

  if (!props.communities)
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className="communities">
      <div className="communitiesList">
        <h2>Communities</h2>

        {props.communities.map((communitie, index) => (
          <div className="community">
            <Link
              to={`${communitie.country_id}/communities/${communitie.community_name}/${communitie.communityid}/Children`}
              key={index}
            >
              {communitie.community_name}
            </Link>
          </div>
        ))}
      </div>
      <div className="addcommunity">
        <Link
          to={`${props.match.params.country_id}/communities/createacommunity`}
        >
          Add Community
        </Link>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    communities: state.communities,
    // countries: state.data
  };
};
export default connect(mapStatetoProps, { countryFetch, userInfo })(
  Communities
);

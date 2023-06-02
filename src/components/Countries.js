import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { allCountries, userInfo, createCountry } from "../actions";
function Countries(props) {
  useEffect(() => {
    props.allCountries();
    props.userInfo(sessionStorage.getItem("userId"));
  }, []);

  if (!props.countries) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="countries">
      <div className="countriesList">
        {props.countries.map((country, index) => (
          <div className="country">
            <Link
              to={`/${sessionStorage.getItem("username")}/admin/${
                country.country_name
              }/${country.id}`}
              key={index}
            >
              {country.country_name}
            </Link>
          </div>
        ))}
      </div>

      <div className="addcountry">
        <Link to={`admin/createcountry`}>Add Country</Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    username: state.user,
    countries: state.data,
    loading: state.isloading,
  };
};

export default connect(mapStateToProps, {
  allCountries,
  userInfo,
  createCountry,
})(Countries);

import React from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import Communities from "./components/Communities";
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import CreateACountry from "./components/CreateACountry";
import CreateAUser from "./components/CreateAUser";
import Children from "./components/Children";
import CreateACommunity from "./components/CreateACommunity";
import ChildRecordNewForm from "./components/ChildRecordNewForm";
import LogInForm from "./components/LogInForm";
import Menu from "./components/Menu";
import AllUsers from "./components/AllUsers";
import Countries from "./components/Countries";
import ShowUser from "./components/ShowUser"
import ChildView from "./components/ChildView"

import Header from "./components/Header";

function App(props) {
  // sessionStorage.clear();
  if (props.isloading)
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div className="homePage">
      <PrivateRoute path="/:username">
        <Route path="/" component={Header} />
        <Route path="/:username/admin/createcountry" component={CreateACountry} />
        <Route exact path="/:username/admin/show-users" component={AllUsers} />
        <Route exact path="/:username/admin" component={Countries} />
        <Route exact path="/:username/user/:countryname/:country_id/" component={Communities} />
        <Route exact path="/:username/admin/:countryname/:country_id/" component={Communities} />
        <Route exact path="/:username" component={Menu} />

        <Route exact path="/:username/admin/show-users/create/user" component={CreateAUser} />
        <Route exact path="/:username/admin/users-show/:username/:id" component={ShowUser} />
        <Route
          path="/:username/admin/:countryname/:country_id/communities/createacommunity"
          component={CreateACommunity}
        />
        <Route
          path="/:username/user/:countryname/:country_id/communities/createacommunity"
          component={CreateACommunity}
        />
        {/* <Route
          exact
          path="/:countryid/:communityid/children"
          component={Children}
        /> */}
        <Route
          exact
          path="/:user/admin/:countryname/:country_id/communities/:community_name/:communityid/children"
          component={Children}
        />
        <Route
          exact
          path="/:user/user/:countryname/:country_id/communities/:community_name/:communityid/children"
          component={Children}
        />

        <Route exact path="/:user/admin/:countryname/:country_id/communities/:community_name/:communityid/add/child" component={ChildRecordNewForm} />
        <Route exact path="/:user/user/:countryname/:country_id/communities/:community_name/:communityid/add/child" component={ChildRecordNewForm} />
        <Route
          exact
          path="/:user/user/:countryname/:country_id/communities/:community_name/:communityid/record/:childid"
          component={ChildView}
        />
        <Route
          exact
          path="/:user/admin/:countryname/:country_id/communities/:community_name/:communityid/record/:childid"
          component={ChildView}
        />
      </PrivateRoute>

      <Route exact path="/" render={props => <LogInForm {...props} />} />
    </div>
  );
}

export default connect(state => state)(App);

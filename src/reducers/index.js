import {
  LOGIN_LOADING,
  LOGIN_FETCH,
  LOGIN_FAILED,
  USER_INFO_LOADING,
  USER_INFO_FETCH,
  USER_INFO_FAILED,
  COUNTRY_INFO_LOADING,
  COUNTRY_INFO_FETCH,
  COUNTRY_INFO_FAILED,
  COUNTRIES_LOADING,
  COUNTRIES_INFO_FETCH,
  COUNTRIES_INFO_FAILED,
  USERS_INFO_FETCH,
  CLEANING_DATA,
  RECORDS_START,
  RECORDS_FETCH,
  RECORDS_FAILED,
  RECORD_START,
  RECORD_FETCH,
  RECORD_FAILED,
  ALL_USERS_FETCH,
  ALL_USERS_FAILED,
} from "../actions";

const initiallstate = {
  user: null,
  data: [],
  isloading: false,
  error: null,
  token: sessionStorage.getItem("token"),
  userInfo: "",
  countries: [],
  allusers: [],
  communities: null,
  records: null,
  child: null,
  allusers: null,
  childTrack: null,
};

export const rootReducer = (state = initiallstate, actions) => {
  switch (actions.type) {
    // Login Cases
    case LOGIN_LOADING:
      return {
        ...state,
        isloading: true,
        error: null,
      };

    case LOGIN_FETCH:
      console.log(actions.payload.user);
      sessionStorage.setItem("userId", actions.payload.user.id);
      sessionStorage.setItem("token", actions.payload.token);
      sessionStorage.setItem("username", actions.payload.user.username);
      sessionStorage.setItem("isAdmin", actions.payload.user.isAdmin);
      sessionStorage.setItem("countryId", actions.payload.user.country_id);
      console.log(sessionStorage.getItem("userId"));
      return {
        ...state,
        user: actions.payload.user,
        token: actions.payload.token,
        isloading: false,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        data: [],
        isloading: false,
        error: "Invalid UserName or Password!",
      };

    // user info fetch
    // case USER_INFO_LOADING:
    //   return {
    //     ...state,
    //     isloading: true,
    //     error: null
    //   };

    case USER_INFO_FETCH:
      return {
        ...state,
        user: actions.payload.user,
        isloading: false,
        error: null,
      };
    case USER_INFO_FAILED:
      return {
        data: [],
        isloading: false,
        error: "error loading user Info",
      };

    // Country Fetch
    case COUNTRY_INFO_LOADING:
      return {
        ...state,
        communities: null,
        error: null,
      };
    case COUNTRY_INFO_FETCH:
      return {
        ...state,
        communities: actions.payload,
        isloading: false,
        error: null,
      };
    case COUNTRY_INFO_FAILED:
      return {
        data: [],
        isloading: false,
        error: "NO COMMUNITE FOUND",
      };

    // // Countries Fetch
    // case COUNTRIES_LOADING:
    //   return {
    //     ...state,
    //     isloading: true,
    //     error: null
    //   };

    case COUNTRIES_INFO_FETCH:
      console.log(actions.payload);
      return {
        ...state,
        data: actions.payload,
        isloading: false,
        error: null,
      };
    case COUNTRIES_INFO_FAILED:
      return {
        data: [],
        isloading: false,
        error: "error loading Info",
      };

    // case USERS_INFO_FETCH:
    //   return {
    //     ...state,
    //     allusers: actions.payload,
    //     isloading: false,
    //     error: null
    //   };
    // case CLEANING_DATA:
    //   return {
    //     initiallstate
    //   };

    // Records
    case RECORDS_START:
      return {
        ...state,
        records: null,
        error: null,
      };

    case RECORDS_FETCH:
      return {
        ...state,
        records: actions.payload,
        isloading: false,
        error: null,
      };
    case RECORDS_FAILED:
      return {
        records: null,
        isloading: false,
        error: "error loading user Info",
      };

    // CHILD RECORD
    case RECORD_START:
      return {
        ...state,
        isloading: true,
        error: null,
      };

    case RECORD_FETCH:
      console.log(actions.payload)
      return {
        ...state,
        child: actions.payload[0],
        childTrack: actions.payload[1],
        isloading: false,
        error: null,
      };
    case RECORD_FAILED:
      return {
        child: null,
        isloading: false,
        error: "error loading user Info",
      };

    // ALL USERS FETCH
    case ALL_USERS_FETCH:
      return {
        ...state,
        allusers: actions.payload,
        isloading: false,
        error: null,
      };
    case ALL_USERS_FAILED:
      return {
        isloading: false,
        error: "error loading user Info",
      };
    default:
      return state;
  }
};

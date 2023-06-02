import axios from "axios";

function axiosWithAuth() {
  const token = sessionStorage.getItem("token");
  return axios.create({
    baseURL :"https://child-nutrition.onrender.com/api/auth",
    // baseURL: "http://localhost:5000/api/auth",
    // baseURL: "https://malo01.herokuapp.com/api/auth",
    headers: {
      authorization: token,
    },
  });
}

export default axiosWithAuth;


// https://malo01.herokuapp.com/
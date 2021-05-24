import axios from "axios";

const axiosWithAuth = () => {
  //console.log('axiosWithAuth has fired')
  const token = localStorage.getItem("authToken");
  // console.log("token from axiosWithAuth: ", token)
  return axios.create({
    baseURL: "https://amazing-fitness-app.herokuapp.com/api",
    headers: { Authorization: token }
  });
}

export default axiosWithAuth

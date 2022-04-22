import axiosInstance from "../../apiServices";

const getUserDetailsOnLogin = (details) => {
  return axiosInstance.post(`Main/Login_validate_USER?userId=${details}`);
};

const sendOtp = (details) => {
  return axiosInstance.post(
    "https://prod-00.centralindia.logic.azure.com/workflows/a7d7a088db2d41e985861b0509977c77/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5Xl1exEMOMVsctxYVZdHTOhIsQEi5fpWrhQB5dgqUFY",details 
  );
};

const resendOtp = (details) => {
  return axiosInstance.post(
    "https://prod-00.centralindia.logic.azure.com/workflows/a7d7a088db2d41e985861b0509977c77/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5Xl1exEMOMVsctxYVZdHTOhIsQEi5fpWrhQB5dgqUFY",details 
  );
};
const loginSuccess = (details) => {
  return axiosInstance.post(
    "https://prod-10.centralindia.logic.azure.com/workflows/e9581b06077b4a09af1c86467d171669/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mx-U8GIyh0K8cSfBtqVul5hmkNHJ_69VjmppB6N7Uy0", details

  )
}
const validatePassword = (details) => {
  return axiosInstance.post(`Main/Login_validate_Password?userId=${details.userId}&password=${details.password}`);
};
const ledgerData = (details) => {
  
   return axiosInstance.get(`Main/Ledger_Summary?fromDate=${details.fromDate}&toDate=${details.toDate}`);
}
export default {
  getUserDetailsOnLogin,
  sendOtp,
  resendOtp,
  loginSuccess,
  validatePassword,
  ledgerData
};
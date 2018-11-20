import Expo from "expo";

const { manifest } = Expo.Constants;
// const api = (process.env.REACT_APP_SERVER === "prod")
//   ? `http://40.118.188.95:8080`
//   : `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3001`)}`;

// const api = `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3001`)}`;
const api = `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3001`)}`;

export default api;
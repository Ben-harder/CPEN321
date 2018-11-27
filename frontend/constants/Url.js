import Expo from "expo";

const { manifest } = Expo.Constants;

/* Uncomment one api and only one */

// localhost api
// const api = `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3001`)}`;

// server api
const api = `http://104.211.28.205:8080`;

export default api;
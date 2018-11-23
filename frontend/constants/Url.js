import Expo from "expo";

const { manifest } = Expo.Constants;

/* Uncomment one api and only one */

// localhost api
const api = `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3001`)}`;

// server api
// const api = `http://40.118.188.95:8080`;

export default api;
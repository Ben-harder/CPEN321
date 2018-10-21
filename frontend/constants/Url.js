import Expo from "expo";

const { manifest } = Expo.Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? `http://${manifest.debuggerHost.split(`:`).shift().concat(`:3001`)}`
  : `api.example.com`;

export default api;
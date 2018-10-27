// Dependencies
import * as types from "./types";

export const userData = payload => ({
  type: types.USER_DATA,
	payload,
});

// Return auth to initial state.
export const clearUser = () => ({
	type: types.CLEAR_USER_DATA
});

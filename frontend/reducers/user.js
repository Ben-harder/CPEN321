import * as types from '../actions/types';

const initialState = { data: {} };

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case types.USER_DATA:
		const newState = Object.assign({}, state);
		newState.data = Object.assign({}, state.data, action.payload);
		// aliases should be phansed out ASAP
		if (action.payload.first_name) newState.data.firstName = action.payload.first_name;
		if (action.payload.last_name) newState.data.lastName = action.payload.last_name;
		if (action.payload.phone_number) newState.data.twoFactorEnabled = action.payload.two_factor_enabled;
		if (action.payload.ID) newState.data.id = action.payload.ID;
    return newState;
    
	case types.CLEAR_USER_DATA:
    return initialState;

	default:
		return state;
	}
};

export default reducer;

import * as types from '../actions/types';

const initialState = { data: {} };

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case types.USER_DATA:
		const newState = Object.assign({}, state);
		newState.data = Object.assign({}, state.data, action.payload);
		// aliases should be phansed out ASAP
		if (action.payload.firstName) newState.data.firstName = action.payload.firstName;
		if (action.payload.lastNAme) newState.data.lastName = action.payload.lastName;
		if (action.payload.phoneNumber) newState.data.phoneNumber = action.payload.phoneNumber;
    return newState;
    
	case types.CLEAR_USER_DATA:
    return initialState;

	default:
		return state;
	}
};

export default reducer;

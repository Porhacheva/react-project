import {
	FEED_TAB_IS_ACTIVE,
	GET_REGISTRATION_FAILED,
	GET_REGISTRATION_REQUEST,
	GET_REGISTRATION_SUCCESS,
	MAIN_TAB_IS_ACTIVE,
	LOGIN_TAB_IS_ACTIVE,
	LOGOUT_TAB_IS_ACTIVE,
	PROFILE_TAB_IS_ACTIVE,
	HISTORY_TAB_IS_ACTIVE,
	LOGOUT,
	SAVE_PASSWORD,
	LOGIN,
	AUTH,
	REVIVE_PASSWORD_PAGE_IS_VISITED,
} from '../actions/registration';

const registrationState = {
	registrationRequest: false,
	registrationRequestFailed: false,
	isAuth: false,
	email: '',
	name: '',
	password: '',
	accessToken: '',

	//tabs
	mainTabIsActive: false,
	feedTabIsActive: false,
	loginTabIsActive: false,
	profileTabIsActive: false,
	historyTabIsActive: false,
	logoutTabIsActive: false,

	revivePasswordPageIsVisited: false,
};

export const registrationReducer = (state = registrationState, action: any) => {
	switch (action.type) {
		case GET_REGISTRATION_REQUEST: {
			return {
				...state,
				registrationRequest: true,
			};
		}
		case GET_REGISTRATION_SUCCESS: {
			return {
				...state,
				isAuth: true,
				email: action.response.user.email,
				name: action.response.user.name,
			};
		}
		case GET_REGISTRATION_FAILED: {
			return {
				...state,
				registrationRequestFailed: true,
				registrationRequest: false,
			};
		}
		case LOGIN: {
			return {
				...state,
				registrationRequest: false,
				email: action.response.user.email,
				name: action.response.user.name,
			};
		}
		case LOGOUT: {
			return {
				...state,
				isAuth: false,
				accessToken: '',
				email: '',
				name: '',
				password: '',
			};
		}
		case SAVE_PASSWORD: {
			return {
				...state,
				password: action.password,
			};
		}
		case AUTH: {
			return {
				...state,
				isAuth: true,
			};
		}
		case MAIN_TAB_IS_ACTIVE: {
			return {
				...state,
				mainTabIsActive: true,
				feedTabIsActive: false,
				loginTabIsActive: false,
			};
		}
		case FEED_TAB_IS_ACTIVE: {
			return {
				...state,
				mainTabIsActive: false,
				feedTabIsActive: true,
				loginTabIsActive: false,
			};
		}
		case LOGIN_TAB_IS_ACTIVE: {
			return {
				...state,
				mainTabIsActive: false,
				feedTabIsActive: false,
				loginTabIsActive: true,
			};
		}
		case PROFILE_TAB_IS_ACTIVE: {
			return {
				...state,
				profileTabIsActive: true,
				historyTabIsActive: false,
				logoutTabIsActive: false,
			};
		}
		case HISTORY_TAB_IS_ACTIVE: {
			return {
				...state,
				profileTabIsActive: false,
				historyTabIsActive: true,
				logoutTabIsActive: false,
			};
		}
		case LOGOUT_TAB_IS_ACTIVE: {
			return {
				...state,
				profileTabIsActive: false,
				historyTabIsActive: false,
				logoutTabIsActive: true,
			};
		}
		case REVIVE_PASSWORD_PAGE_IS_VISITED: {
			return {
				...state,
				revivePasswordPageIsVisited: true,
			};
		}
		default: {
			return state;
		}
	}
};

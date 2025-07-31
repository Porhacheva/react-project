import { registrationReducer, registrationState } from './registration';
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

describe('registrationReducer', () => {
	it('should return the initial state', () => {
		expect(registrationReducer(undefined, {})).toEqual(registrationState);
	});

	it('should handle GET_REGISTRATION_REQUEST', () => {
		const action = { type: GET_REGISTRATION_REQUEST };
		expect(registrationReducer(registrationState, action)).toEqual({
			...registrationState,
			registrationRequest: true,
			error: '',
		});
	});

	it('should handle GET_REGISTRATION_SUCCESS', () => {
		const action = {
			type: GET_REGISTRATION_SUCCESS,
			response: {
				user: { email: 'test@mail.com', name: 'Tester' },
			},
		};
		expect(registrationReducer(registrationState, action)).toEqual({
			...registrationState,
			isAuth: true,
			email: 'test@mail.com',
			name: 'Tester',
			error: '',
		});
	});

	it('should handle GET_REGISTRATION_FAILED', () => {
		const action = {
			type: GET_REGISTRATION_FAILED,
			error: 'Registration failed',
		};
		expect(registrationReducer(registrationState, action)).toEqual({
			...registrationState,
			registrationRequestFailed: true,
			registrationRequest: false,
			error: 'Registration failed',
		});
	});

	it('should handle LOGIN', () => {
		const action = {
			type: LOGIN,
			response: {
				user: { email: 'login@mail.com', name: 'LoginUser' },
			},
		};
		expect(registrationReducer(registrationState, action)).toEqual({
			...registrationState,
			registrationRequest: false,
			email: 'login@mail.com',
			name: 'LoginUser',
		});
	});

	it('should handle LOGOUT', () => {
		const state = {
			...registrationState,
			isAuth: true,
			accessToken: 'token',
			email: 'user@mail.com',
			name: 'User',
			password: 'secret',
		};
		expect(registrationReducer(state, { type: LOGOUT })).toEqual({
			...state,
			isAuth: false,
			accessToken: '',
			email: '',
			name: '',
			password: '',
		});
	});

	it('should handle SAVE_PASSWORD', () => {
		const action = {
			type: SAVE_PASSWORD,
			password: 'mypassword',
		};
		expect(registrationReducer(registrationState, action)).toEqual({
			...registrationState,
			password: 'mypassword',
		});
	});

	it('should handle AUTH', () => {
		expect(registrationReducer(registrationState, { type: AUTH })).toEqual({
			...registrationState,
			isAuth: true,
		});
	});

	// Tabs
	it('should handle MAIN_TAB_IS_ACTIVE', () => {
		expect(
			registrationReducer(registrationState, { type: MAIN_TAB_IS_ACTIVE })
		).toEqual({
			...registrationState,
			mainTabIsActive: true,
			feedTabIsActive: false,
			loginTabIsActive: false,
		});
	});

	it('should handle FEED_TAB_IS_ACTIVE', () => {
		expect(
			registrationReducer(registrationState, { type: FEED_TAB_IS_ACTIVE })
		).toEqual({
			...registrationState,
			mainTabIsActive: false,
			feedTabIsActive: true,
			loginTabIsActive: false,
		});
	});

	it('should handle LOGIN_TAB_IS_ACTIVE', () => {
		expect(
			registrationReducer(registrationState, { type: LOGIN_TAB_IS_ACTIVE })
		).toEqual({
			...registrationState,
			mainTabIsActive: false,
			feedTabIsActive: false,
			loginTabIsActive: true,
		});
	});

	it('should handle PROFILE_TAB_IS_ACTIVE', () => {
		expect(
			registrationReducer(registrationState, { type: PROFILE_TAB_IS_ACTIVE })
		).toEqual({
			...registrationState,
			profileTabIsActive: true,
			historyTabIsActive: false,
			logoutTabIsActive: false,
		});
	});

	it('should handle HISTORY_TAB_IS_ACTIVE', () => {
		expect(
			registrationReducer(registrationState, { type: HISTORY_TAB_IS_ACTIVE })
		).toEqual({
			...registrationState,
			profileTabIsActive: false,
			historyTabIsActive: true,
			logoutTabIsActive: false,
		});
	});

	it('should handle LOGOUT_TAB_IS_ACTIVE', () => {
		expect(
			registrationReducer(registrationState, { type: LOGOUT_TAB_IS_ACTIVE })
		).toEqual({
			...registrationState,
			profileTabIsActive: false,
			historyTabIsActive: false,
			logoutTabIsActive: true,
		});
	});

	it('should handle REVIVE_PASSWORD_PAGE_IS_VISITED', () => {
		expect(
			registrationReducer(registrationState, {
				type: REVIVE_PASSWORD_PAGE_IS_VISITED,
			})
		).toEqual({
			...registrationState,
			revivePasswordPageIsVisited: true,
		});
	});
});

import { url } from '@/utils/constants';
import {
	deleteCookie,
	doAuthRequest,
	doRequest,
	getCookie,
	getToken,
	setCookie,
} from '@/utils/helper';
import {
	TPostRegistrationRequest,
	TPostResetPasswordResponce,
	TPostResetPasswordRequest,
	TPostLoginResponce,
	TPostLoginRequest,
	TPostTokenResponce,
	TUser,
} from '@/utils/types';

export const GET_REGISTRATION_REQUEST = 'GET_REGISTRATION_REQUEST';
export const GET_REGISTRATION_SUCCESS = 'GET_REGISTRATION_SUCCESS';
export const GET_REGISTRATION_FAILED = 'GET_REGISTRATION_FAILED';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const AUTH = 'AUTH';

//tabs
export const MAIN_TAB_IS_ACTIVE = 'MAIN_TAB_IS_ACTIVE';
export const FEED_TAB_IS_ACTIVE = 'FEED_TAB_IS_ACTIVE';
export const LOGIN_TAB_IS_ACTIVE = 'LOGIN_TAB_IS_ACTIVE';

export const PROFILE_TAB_IS_ACTIVE = 'PROFILE_TAB_IS_ACTIVE';
export const HISTORY_TAB_IS_ACTIVE = 'HISTORY_TAB_IS_ACTIVE';
export const LOGOUT_TAB_IS_ACTIVE = 'LOGOUT_TAB_IS_ACTIVE';

export const REVIVE_PASSWORD_PAGE_IS_VISITED =
	'REVIVE_PASSWORD_PAGE_IS_VISITED';

export function getAuthUser() {
	return async function (
		dispatch: (...args: any[]) => Promise<TPostLoginResponce>
	) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const response: TPostLoginResponce = await doAuthRequest(
				url.apiUrl + url.auth + url.userUrl,
				'token'
			);
			if (response && response.success) {
				dispatch({
					type: LOGIN,
					response,
				});
				return response;
			}
		} catch (error: any) {
			if (error.message.includes('expired')) {
				console.log(error);
				throw Error(error);
			} else {
				dispatch({
					type: GET_REGISTRATION_FAILED,
				});
			}
		}
	};
}
export function patchUser(data: TUser) {
	return async function (
		dispatch: (...args: any[]) => Promise<TPostLoginResponce>
	) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const response: TPostLoginResponce = await doAuthRequest(
				url.apiUrl + url.auth + url.userUrl,
				'token',
				'PATCH',
				data
			);
			const password: string | undefined = data.password;
			dispatch({
				type: LOGIN,
				response,
			});
			dispatch({
				type: SAVE_PASSWORD,
				password,
			});
			return response;
		} catch (error) {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

export function postRegistration(data: TPostRegistrationRequest) {
	return async function (
		dispatch: (...args: any[]) => Promise<TPostLoginResponce>
	) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const response: TPostLoginResponce = await doRequest(
				url.apiUrl + url.auth + url.registerUrl,
				'POST',
				data
			);
			dispatch({
				type: GET_REGISTRATION_SUCCESS,
				response,
			});
			setCookie('token', getToken(response.accessToken));
			setCookie('refreshToken', response.refreshToken);
			return response;
		} catch (error) {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

export function postLogin(data: TPostLoginRequest) {
	return async function (dispatch: (...args: any[]) => any) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const response: TPostLoginResponce = await doRequest(
				url.apiUrl + url.auth + url.loginUrl,
				'POST',
				data
			);
			dispatch({
				type: GET_REGISTRATION_SUCCESS,
				response,
			});
			setCookie('token', getToken(response.accessToken));
			setCookie('refreshToken', response.refreshToken);
			return response;
		} catch (error) {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}
export function postLogout() {
	return async function (
		dispatch: (...args: any[]) => Promise<TPostResetPasswordResponce>
	) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const token = getCookie('refreshToken');
			await doRequest(url.apiUrl + url.auth + url.logoutUrl, 'POST', { token });
			dispatch({
				type: LOGOUT,
			});
			deleteCookie('token');
			deleteCookie('refreshToken');
			return;
		} catch (error) {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

export function postRefreshToken() {
	return async function (dispatch: (...args: any[]) => any) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const token = getCookie('refreshToken');
			const response: TPostTokenResponce = await doRequest(
				url.apiUrl + url.auth + url.tokenUrl,
				'POST',
				{ token: token }
			);
			setCookie('token', getToken(response.accessToken));
			setCookie('refreshToken', response.refreshToken);
			return response;
		} catch (error: any) {
			if (error.message.includes('Token is invalid')) {
				console.log(error);
				throw Error(error);
			} else {
				dispatch({
					type: GET_REGISTRATION_FAILED,
				});
			}
		}
	};
}

export function postEmailToResetPassword(email: string): any {
	return async function (
		dispatch: (...args: any[]) => Promise<TPostResetPasswordResponce>
	) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			return await doRequest(url.apiUrl + url.passwordForgotUrl, 'POST', {
				email: email,
			});
		} catch (error) {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

export function postResetPassword(data: TPostResetPasswordRequest) {
	return async function (dispatch: (...args: any[]) => any) {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const data1: TPostResetPasswordResponce = await doRequest(
				url.apiUrl + url.passwordForgotUrl + url.passwordResetUrl,
				'POST',
				data
			);
			return data1;
		} catch (error) {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

import { url } from '@/utils/constants';
import {
	deleteCookie,
	doAuthRequest,
	doRequest,
	getCookie,
	getToken,
	setCookie,
} from '@/utils/helper';
import { AppDispatch } from '../types';
import {
	TPostLoginResponce,
	TUser,
	TPostRegistrationRequest,
	TPostLoginRequest,
	TResponce,
	TPostTokenResponce,
	TPostResetPasswordRequest,
} from '../types/api';

export const GET_REGISTRATION_REQUEST: 'GET_REGISTRATION_REQUEST' =
	'GET_REGISTRATION_REQUEST' as const;
export const GET_REGISTRATION_SUCCESS: 'GET_REGISTRATION_SUCCESS' =
	'GET_REGISTRATION_SUCCESS' as const;
export const GET_REGISTRATION_FAILED: 'GET_REGISTRATION_FAILED' =
	'GET_REGISTRATION_FAILED' as const;

export const LOGIN: 'LOGIN' = 'LOGIN' as const;
export const LOGOUT: 'LOGOUT' = 'LOGOUT' as const;
export const SAVE_PASSWORD: 'SAVE_PASSWORD' = 'SAVE_PASSWORD' as const;
export const AUTH: 'AUTH' = 'AUTH' as const;

//tabs
export const MAIN_TAB_IS_ACTIVE: 'MAIN_TAB_IS_ACTIVE' =
	'MAIN_TAB_IS_ACTIVE' as const;
export const FEED_TAB_IS_ACTIVE: 'FEED_TAB_IS_ACTIVE' =
	'FEED_TAB_IS_ACTIVE' as const;
export const LOGIN_TAB_IS_ACTIVE: 'LOGIN_TAB_IS_ACTIVE' =
	'LOGIN_TAB_IS_ACTIVE' as const;

export const PROFILE_TAB_IS_ACTIVE: 'PROFILE_TAB_IS_ACTIVE' =
	'PROFILE_TAB_IS_ACTIVE' as const;
export const HISTORY_TAB_IS_ACTIVE: 'HISTORY_TAB_IS_ACTIVE' =
	'HISTORY_TAB_IS_ACTIVE' as const;
export const LOGOUT_TAB_IS_ACTIVE: 'LOGOUT_TAB_IS_ACTIVE' =
	'LOGOUT_TAB_IS_ACTIVE' as const;

export const REVIVE_PASSWORD_PAGE_IS_VISITED: 'REVIVE_PASSWORD_PAGE_IS_VISITED' =
	'REVIVE_PASSWORD_PAGE_IS_VISITED' as const;

export function getAuthUser(): (
	dispatch: AppDispatch
) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TPostLoginResponce | undefined> {
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
				throw Error(error);
			} else {
				dispatch({
					type: GET_REGISTRATION_FAILED,
				});
			}
		}
	};
}
export function patchUser(
	data: TUser
): (dispatch: AppDispatch) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TPostLoginResponce | undefined> {
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
		} catch {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

export function postRegistration(
	data: TPostRegistrationRequest
): (dispatch: AppDispatch) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TPostLoginResponce | undefined> {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const response: TPostLoginResponce = await doRequest(
				url.apiUrl + url.auth + url.registerUrl,
				'POST',
				data
			);
			const password: string = data.password;
			dispatch({
				type: GET_REGISTRATION_SUCCESS,
				response,
			});
			setCookie('token', getToken(response.accessToken));
			setCookie('refreshToken', response.refreshToken);
			dispatch({ type: SAVE_PASSWORD, password });
			dispatch({ type: MAIN_TAB_IS_ACTIVE });
			return response;
		} catch (error: unknown) {
			dispatch({
				type: GET_REGISTRATION_FAILED,
				error,
			});
		}
	};
}

export function postLogin(
	data: TPostLoginRequest
): (dispatch: AppDispatch) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TPostLoginResponce | undefined> {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const response: TPostLoginResponce = await doRequest(
				url.apiUrl + url.auth + url.loginUrl,
				'POST',
				data
			);
			const password: string = data.password;
			dispatch({
				type: GET_REGISTRATION_SUCCESS,
				response,
			});
			setCookie('token', getToken(response.accessToken));
			setCookie('refreshToken', response.refreshToken);
			dispatch({ type: SAVE_PASSWORD, password });
			dispatch({ type: MAIN_TAB_IS_ACTIVE });
			return response;
		} catch {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}
export function postLogout(): (
	dispatch: AppDispatch
) => Promise<TResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TResponce | undefined> {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const token: string | undefined = getCookie('refreshToken');
			await doRequest(url.apiUrl + url.auth + url.logoutUrl, 'POST', { token });
			dispatch({
				type: LOGOUT,
			});
			deleteCookie('token');
			deleteCookie('refreshToken');
			return;
		} catch {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

export function postRefreshToken(): (
	dispatch: AppDispatch
) => Promise<TPostTokenResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TPostTokenResponce | undefined> {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			const token: string | undefined = getCookie('refreshToken');
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
				throw Error(error);
			} else {
				dispatch({
					type: GET_REGISTRATION_FAILED,
				});
			}
		}
	};
}

export function postEmailToResetPassword(
	email: string
): (dispatch: AppDispatch) => Promise<TResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TResponce | undefined> {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			await doRequest<TResponce>(url.apiUrl + url.passwordForgotUrl, 'POST', {
				email: email,
			});
			dispatch({ type: REVIVE_PASSWORD_PAGE_IS_VISITED });
			return;
		} catch {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

export function postResetPassword(
	data: TPostResetPasswordRequest
): (dispatch: AppDispatch) => Promise<TResponce | undefined> {
	return async function (
		dispatch: AppDispatch
	): Promise<TResponce | undefined> {
		dispatch({
			type: GET_REGISTRATION_REQUEST,
		});
		try {
			return await doRequest(
				url.apiUrl + url.passwordForgotUrl + url.passwordResetUrl,
				'POST',
				data
			);
		} catch {
			dispatch({
				type: GET_REGISTRATION_FAILED,
			});
		}
	};
}

import { TDispatch } from '@/main';
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
	TResponce,
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

export function getAuthUser(): (
	dispatch: TDispatch
) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: TDispatch
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
): (dispatch: TDispatch) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: TDispatch
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
): (dispatch: TDispatch) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: TDispatch
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
): (dispatch: TDispatch) => Promise<TPostLoginResponce | undefined> {
	return async function (
		dispatch: TDispatch
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
	dispatch: TDispatch
) => Promise<TResponce | undefined> {
	return async function (dispatch: TDispatch): Promise<TResponce | undefined> {
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
	dispatch: TDispatch
) => Promise<TPostTokenResponce | undefined> {
	return async function (
		dispatch: TDispatch
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
): (dispatch: TDispatch) => Promise<TResponce | undefined> {
	return async function (dispatch: TDispatch): Promise<TResponce | undefined> {
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
): (dispatch: TDispatch) => Promise<TResponce | undefined> {
	return async function (dispatch: TDispatch): Promise<TResponce | undefined> {
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

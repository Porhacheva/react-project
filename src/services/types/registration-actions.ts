import {
	GET_REGISTRATION_REQUEST,
	GET_REGISTRATION_SUCCESS,
	GET_REGISTRATION_FAILED,
	LOGIN,
	LOGOUT,
	SAVE_PASSWORD,
	AUTH,
	MAIN_TAB_IS_ACTIVE,
	FEED_TAB_IS_ACTIVE,
	LOGIN_TAB_IS_ACTIVE,
	PROFILE_TAB_IS_ACTIVE,
	HISTORY_TAB_IS_ACTIVE,
	LOGOUT_TAB_IS_ACTIVE,
	REVIVE_PASSWORD_PAGE_IS_VISITED,
} from '../actions/registration';

interface IGetRegistrationAction {
	readonly type: typeof GET_REGISTRATION_REQUEST;
}
interface IGetRegistrationSuccessAction {
	readonly type: typeof GET_REGISTRATION_SUCCESS;
}
interface IGetRegistrationFailedAction {
	readonly type: typeof GET_REGISTRATION_FAILED;
}
interface ILoginAction {
	readonly type: typeof LOGIN;
}
interface ILogoutAction {
	readonly type: typeof LOGOUT;
}
interface ISavePasswordAction {
	readonly type: typeof SAVE_PASSWORD;
}
interface IAuthAction {
	readonly type: typeof AUTH;
}
interface IMainTabIsActiveAction {
	readonly type: typeof MAIN_TAB_IS_ACTIVE;
}
interface IFeedTabIsActiveAction {
	readonly type: typeof FEED_TAB_IS_ACTIVE;
}
interface ILoginTabIsActiveAction {
	readonly type: typeof LOGIN_TAB_IS_ACTIVE;
}
interface IProfileTabIsActiveAction {
	readonly type: typeof PROFILE_TAB_IS_ACTIVE;
}
interface IHistoryTabIsActiveAction {
	readonly type: typeof HISTORY_TAB_IS_ACTIVE;
}
interface ILogoutTabIsActiveAction {
	readonly type: typeof LOGOUT_TAB_IS_ACTIVE;
}
interface IRevivePasswordPageIsVisitedAction {
	readonly type: typeof REVIVE_PASSWORD_PAGE_IS_VISITED;
}

export type TRegistrationActions =
	| IGetRegistrationAction
	| IGetRegistrationSuccessAction
	| IGetRegistrationFailedAction
	| ILoginAction
	| ILogoutAction
	| ISavePasswordAction
	| IAuthAction
	| IMainTabIsActiveAction
	| IFeedTabIsActiveAction
	| ILoginTabIsActiveAction
	| IProfileTabIsActiveAction
	| IHistoryTabIsActiveAction
	| ILogoutTabIsActiveAction
	| IRevivePasswordPageIsVisitedAction;

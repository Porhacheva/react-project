import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
} from '../actions/ws-actions';
import { TOrderData } from './api';

interface IWSConnectionStart {
	readonly type: typeof WS_CONNECTION_START;
}

interface IWSConnectionSuccessAction {
	readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWSConnectionErrorAction {
	readonly type: typeof WS_CONNECTION_ERROR;
	readonly payload: Event;
}

interface IWSConnectionClosedAction {
	readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWSGetMessageAction {
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: {
		orders: TOrderData[];
		total: number;
		totalToday: number;
	};
}

interface IWSSendMessageAction {
	readonly type: typeof WS_SEND_MESSAGE;
	readonly payload: { message: string };
}

export type TWSActions =
	| IWSConnectionStart
	| IWSConnectionSuccessAction
	| IWSConnectionErrorAction
	| IWSConnectionClosedAction
	| IWSGetMessageAction
	| IWSSendMessageAction;

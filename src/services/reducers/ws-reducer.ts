import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
	WS_CONNECTION_START,
} from '../actions/ws-actions';
import { TOrderData } from '../types/api';
import { TWSActions } from '../types/ws-actions';

type TWSState = {
	wsConnected: boolean;
	orders: TOrderData[];
	total: number;
	totalToday: number;
	error?: Event;
};

export const initialState: TWSState = {
	wsConnected: false,
	orders: [],
	total: 0,
	totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
	switch (action.type) {
		case WS_CONNECTION_START:
			return {
				...state,
				wsConnected: false,
			};
		case WS_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true,
			};
		case WS_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false,
			};
		case WS_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				wsConnected: false,
			};
		case WS_GET_MESSAGE:
			return {
				...state,
				error: undefined,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};
		default:
			return state;
	}
};

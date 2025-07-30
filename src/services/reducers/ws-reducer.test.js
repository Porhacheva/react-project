import { wsReducer } from './ws-reducer';
import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
	WS_CONNECTION_START,
} from '../actions/ws-actions';

const initialState = {
	wsConnected: false,
	orders: [],
	total: 0,
	totalToday: 0,
};

describe('wsReducer', () => {
	it('should return the initial state', () => {
		expect(wsReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle WS_CONNECTION_START', () => {
		const action = { type: WS_CONNECTION_START };
		expect(wsReducer(initialState, action)).toEqual({
			...initialState,
			wsConnected: false,
		});
	});

	it('should handle WS_CONNECTION_SUCCESS', () => {
		const action = { type: WS_CONNECTION_SUCCESS };
		expect(wsReducer(initialState, action)).toEqual({
			...initialState,
			wsConnected: true,
			error: undefined,
		});
	});

	it('should handle WS_CONNECTION_ERROR', () => {
		const error = 'Connection failed';
		const action = { type: WS_CONNECTION_ERROR, payload: error };
		expect(wsReducer(initialState, action)).toEqual({
			...initialState,
			wsConnected: false,
			error: error,
		});
	});

	it('should handle WS_CONNECTION_CLOSED', () => {
		const action = { type: WS_CONNECTION_CLOSED };
		expect(wsReducer({ ...initialState, wsConnected: true }, action)).toEqual({
			...initialState,
			wsConnected: false,
			error: undefined,
		});
	});

	it('should handle WS_GET_MESSAGE', () => {
		const payload = {
			orders: [{ id: 1, name: 'Order 1' }],
			total: 5,
			totalToday: 2,
		};
		const action = { type: WS_GET_MESSAGE, payload };
		expect(wsReducer(initialState, action)).toEqual({
			...initialState,
			orders: payload.orders,
			total: payload.total,
			totalToday: payload.totalToday,
			error: undefined,
		});
	});
});

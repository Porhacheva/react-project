import { orderReducer, orderState } from './order';
import {
	GET_ORDER_FAILED,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
	SELECT_ORDER,
	GET_FEED_ORDER,
} from '../actions/order';

describe('orderReducer', () => {
	it('should return the initial state', () => {
		expect(orderReducer(undefined, {})).toEqual(orderState);
	});

	it('should handle GET_ORDER_REQUEST', () => {
		const action = { type: GET_ORDER_REQUEST };
		expect(orderReducer(orderState, action)).toEqual({
			...orderState,
			orderRequest: true,
		});
	});

	it('should handle GET_ORDER_SUCCESS', () => {
		const action = { type: GET_ORDER_SUCCESS, order: 12345 };
		expect(orderReducer(orderState, action)).toEqual({
			...orderState,
			orderRequest: false,
			orderRequestFailed: false,
			order: 12345,
		});
	});

	it('should handle GET_ORDER_FAILED', () => {
		const action = { type: GET_ORDER_FAILED };
		expect(orderReducer(orderState, action)).toEqual({
			...orderState,
			orderRequest: false,
			orderRequestFailed: true,
		});
	});

	it('should handle OPEN_ORDER_MODAL', () => {
		const stateWithOrder = {
			...orderState,
		};
		const action = { type: OPEN_ORDER_MODAL };
		expect(orderReducer(stateWithOrder, action)).toEqual({
			...stateWithOrder,
			isModalOpen: true,
			orderNumber: '000000',
		});
	});

	it('should handle CLOSE_ORDER_MODAL', () => {
		const stateWithModalOpen = {
			...orderState,
			isModalOpen: true,
		};
		const action = { type: CLOSE_ORDER_MODAL };
		expect(orderReducer(stateWithModalOpen, action)).toEqual({
			...stateWithModalOpen,
			isModalOpen: false,
		});
	});

	it('should handle SELECT_ORDER', () => {
		const selectedOrder = { id: 'abc123', name: 'Test Selected Order' };
		const action = {
			type: SELECT_ORDER,
			order: selectedOrder,
		};
		expect(orderReducer(orderState, action)).toEqual({
			...orderState,
			orderObject: selectedOrder,
		});
	});

	it('should handle GET_FEED_ORDER', () => {
		const feedOrder = { id: 'feed123', name: 'Feed Order' };
		const action = {
			type: GET_FEED_ORDER,
			orderObject: feedOrder,
		};
		expect(orderReducer(orderState, action)).toEqual({
			...orderState,
			orderObject: feedOrder,
			orderRequest: false,
			orderRequestFailed: false,
		});
	});
});

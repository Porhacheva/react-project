import {
	GET_ORDER_FAILED,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
	SELECT_ORDER,
	GET_FEED_ORDER,
} from '../actions/order';
import { TOrderData } from '../types/api';
import { TOrderActions } from '../types/order-actions';

type TOrderState = {
	isModalOpen: boolean;
	orderNumber: string;
	orderRequest: boolean;
	orderRequestFailed: boolean;
	order: number;
	orderObject: TOrderData | null;
};

const orderState: TOrderState = {
	isModalOpen: false,
	orderNumber: '',
	orderRequest: false,
	orderRequestFailed: false,
	order: 0,
	orderObject: null,
};

function getDigits(number: number): string {
	const orderNumber: string = number.toString();
	return orderNumber.padStart(6, '0');
}

export const orderReducer = (state = orderState, action: TOrderActions) => {
	switch (action.type) {
		case GET_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
			};
		}
		case GET_ORDER_SUCCESS: {
			return {
				...state,
				orderRequestFailed: false,
				order: action.order,
				orderRequest: false,
			};
		}
		case GET_ORDER_FAILED: {
			return {
				...state,
				orderRequestFailed: true,
				orderRequest: false,
			};
		}
		case OPEN_ORDER_MODAL: {
			return {
				...state,
				isModalOpen: true,
				orderNumber: getDigits(state.order),
			};
		}
		case CLOSE_ORDER_MODAL: {
			return {
				...state,
				isModalOpen: false,
			};
		}
		case SELECT_ORDER: {
			return {
				...state,
				orderObject: action.order,
			};
		}
		case GET_FEED_ORDER: {
			return {
				...state,
				orderObject: action.orderObject,
				orderRequestFailed: false,
				orderRequest: false,
			};
		}
		default: {
			return state;
		}
	}
};

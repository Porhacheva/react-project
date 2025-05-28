import {
	GET_ORDER_FAILED,
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
} from '../actions/order';

const orderState = {
	isModalOpen: false,
	orderNumber: '',
	orderRequest: false,
	orderRequestFailed: false,
	order: 0,
};

function getDigits(number: number) {
	const orderNumber = number.toString();
	return orderNumber.padStart(7, '0');
}

export const orderReducer = (state = orderState, action: any) => {
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
		default: {
			return state;
		}
	}
};

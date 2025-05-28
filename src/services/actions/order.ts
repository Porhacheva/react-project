import { url } from '@/utils/constants';
import { doRequest } from '@/utils/helper';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export function createOrder(list: any) {
	return async function (dispatch: (...args: any[]) => any) {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		try {
			const order = await doRequest(url.apiUrl + url.orderUrl, 'POST', list);
			console.log(order);
			dispatch({
				type: GET_ORDER_SUCCESS,
				order: order.order.number,
			});
			dispatch({ type: OPEN_ORDER_MODAL });
		} catch (error) {
			dispatch({
				type: GET_ORDER_FAILED,
			});
		}
	};
}

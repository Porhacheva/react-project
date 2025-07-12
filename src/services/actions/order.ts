import { url } from '@/utils/constants';
import { doRequest } from '@/utils/helper';
import { AppDispatch } from '../types';
import { TOrderResponce } from '../types/api';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' =
	'GET_ORDER_REQUEST' as const;
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' =
	'GET_ORDER_SUCCESS' as const;
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED' as const;

export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL' as const;
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' =
	'CLOSE_ORDER_MODAL' as const;

export function createOrder(list: {
	ingredients: string[];
}): (dispatch: AppDispatch) => Promise<void> {
	return async function (dispatch: AppDispatch): Promise<void> {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		try {
			const order: TOrderResponce = await doRequest(
				url.apiUrl + url.orderUrl,
				'POST',
				list
			);
			dispatch({
				type: GET_ORDER_SUCCESS,
				order: order.order.number,
			});
			dispatch({ type: OPEN_ORDER_MODAL });
		} catch {
			dispatch({
				type: GET_ORDER_FAILED,
			});
		}
	};
}

import { url } from '@/utils/constants';
import { doAuthRequest, doRequest } from '@/utils/helper';
import { AppDispatch } from '../types';
import { TFeedOrderResponce, TOrderResponce } from '../types/api';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' =
	'GET_ORDER_REQUEST' as const;
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' =
	'GET_ORDER_SUCCESS' as const;
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED' as const;

export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL' as const;
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' =
	'CLOSE_ORDER_MODAL' as const;
export const SELECT_ORDER: 'SELECT_ORDER' = 'SELECT_ORDER' as const;
export const GET_FEED_ORDER: 'GET_FEED_ORDER' = 'GET_FEED_ORDER' as const;

export function createOrder(list: {
	ingredients: string[];
}): (dispatch: AppDispatch) => Promise<void> {
	return async function (dispatch: AppDispatch): Promise<void> {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		try {
			const order: TOrderResponce = await doAuthRequest(
				url.apiUrl + url.orderUrl,
				'token',
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
export function getOrder(id: string): (dispatch: AppDispatch) => Promise<void> {
	return async function (dispatch: AppDispatch): Promise<void> {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		try {
			const order: TFeedOrderResponce = await doRequest(
				url.apiUrl + url.orderUrl + `/${id}`,
				'GET'
			);
			dispatch({
				type: GET_FEED_ORDER,
				orderObject: order.orders[0],
			});
		} catch {
			dispatch({
				type: GET_ORDER_FAILED,
			});
		}
	};
}

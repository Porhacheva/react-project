import {
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILED,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
	SELECT_ORDER,
	GET_FEED_ORDER,
} from '../actions/order';
import { TOrderData } from './api';

interface IGetOrderAction {
	readonly type: typeof GET_ORDER_REQUEST;
}
interface IGetOrderSuccessAction {
	readonly type: typeof GET_ORDER_SUCCESS;
	readonly order: number;
}
interface IGetOrderFailedAction {
	readonly type: typeof GET_ORDER_FAILED;
}
interface IOpenOrderModalAction {
	readonly type: typeof OPEN_ORDER_MODAL;
}
interface ICloseOrderModalAction {
	readonly type: typeof CLOSE_ORDER_MODAL;
}
interface ISelectOrderAction {
	readonly type: typeof SELECT_ORDER;
	readonly order: TOrderData;
}
interface IGetFeedOrderAction {
	readonly type: typeof GET_FEED_ORDER;
	readonly orderObject: TOrderData;
}
export type TOrderActions =
	| IGetOrderAction
	| IGetOrderSuccessAction
	| IGetOrderFailedAction
	| IOpenOrderModalAction
	| ICloseOrderModalAction
	| ISelectOrderAction
	| IGetFeedOrderAction;

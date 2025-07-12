import {
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_FAILED,
	OPEN_ORDER_MODAL,
	CLOSE_ORDER_MODAL,
} from '../actions/order';

interface IGetOrderAction {
	readonly type: typeof GET_ORDER_REQUEST;
}
interface IGetOrderSuccessAction {
	readonly type: typeof GET_ORDER_SUCCESS;
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
export type TOrderActions =
	| IGetOrderAction
	| IGetOrderSuccessAction
	| IGetOrderFailedAction
	| IOpenOrderModalAction
	| ICloseOrderModalAction;

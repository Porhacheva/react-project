import { store } from '@/main';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TIngredientsActions } from './actions';
import { TOrderActions } from './order-actions';
import { TRegistrationActions } from './registration-actions';
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
} from '../actions/ws-actions';
import { TWSActions } from './ws-actions';

export type AppActions =
	| TIngredientsActions
	| TOrderActions
	| TRegistrationActions
	| TWSActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
	ReturnType,
	Action,
	RootState,
	AppActions
>;

export type TWSStoreActions = {
	wsInit: typeof WS_CONNECTION_START;
	wsSendMessage: typeof WS_SEND_MESSAGE;
	onOpen: typeof WS_CONNECTION_SUCCESS;
	onClose: typeof WS_CONNECTION_CLOSED;
	onError: typeof WS_CONNECTION_ERROR;
	onMessage: typeof WS_GET_MESSAGE;
};

export type TAPIMethods = 'GET' | 'POST' | 'PATCH';

export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
	key?: string;
};

export type TIconTypes =
	| 'secondary'
	| 'primary'
	| 'error'
	| 'success'
	| 'disabled';

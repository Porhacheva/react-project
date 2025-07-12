import { store } from '@/main';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TIngredientsActions } from './actions';
import { TOrderActions } from './order-actions';
import { TRegistrationActions } from './registration-actions';

export type AppActions =
	| TIngredientsActions
	| TOrderActions
	| TRegistrationActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
	ReturnType,
	Action,
	RootState,
	AppActions
>;

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

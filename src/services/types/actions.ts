import { TIngredient } from '.';
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from '../actions/app';
import {
	ADD_INGREDIENT_TO_CONSTRUCTOR,
	ADD_BUN_TO_CONSTRUCTOR,
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	INCREASE_ITEM,
	DECREASE_ITEM,
	UPDATE_PRICE,
	SWAP_ITEMS,
} from '../actions/constructor';
import {
	OPEN_INGREDIENTS_MODAL,
	CLOSE_INGREDIENTS_MODAL,
} from '../actions/currentIngredient';

interface IGetIngredientsAction {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
}
interface IGetIngredientsSuccessAction {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly ingredients: TIngredient[];
}
interface IGetIngredientsFailedAction {
	readonly type: typeof GET_INGREDIENTS_FAILED;
}
interface IAddIngredientToConstructorAction {
	readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
}
interface IAddBunToConstructorAction {
	readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
}
interface IDeleteIngredientFromConstructorAction {
	readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
}
interface IIncreaseItemAction {
	readonly type: typeof INCREASE_ITEM;
}
interface IDecreaseItemAction {
	readonly type: typeof DECREASE_ITEM;
}
interface IUpdatePriceAction {
	readonly type: typeof UPDATE_PRICE;
}
interface ISwapItemsAction {
	readonly type: typeof SWAP_ITEMS;
}
interface IOpenIngredientsModalAction {
	readonly type: typeof OPEN_INGREDIENTS_MODAL;
}
interface ICloseIngredientsModalAction {
	readonly type: typeof CLOSE_INGREDIENTS_MODAL;
}

export type TIngredientsActions =
	| IGetIngredientsAction
	| IGetIngredientsSuccessAction
	| IGetIngredientsFailedAction
	| IAddIngredientToConstructorAction
	| IAddBunToConstructorAction
	| IDeleteIngredientFromConstructorAction
	| IIncreaseItemAction
	| IDecreaseItemAction
	| IUpdatePriceAction
	| ISwapItemsAction
	| IOpenIngredientsModalAction
	| ICloseIngredientsModalAction;

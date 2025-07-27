import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
} from '../actions/app';
import {
	ADD_BUN_TO_CONSTRUCTOR,
	ADD_INGREDIENT_TO_CONSTRUCTOR,
	DECREASE_ITEM,
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	INCREASE_ITEM,
	SWAP_ITEMS,
} from '../actions/constructor';
import { TIngredient } from '../types';
import { TIngredientsActions } from '../types/actions';

type TAppState = {
	ingredients: TIngredient[];
	ingredientsRequest: boolean;
	ingredientsRequestFailed: boolean;
	constructorIngredients: TIngredient[];
	bun: TIngredient | null;
	price: number;
};

const initialState: TAppState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsRequestFailed: false,
	constructorIngredients: [],
	bun: null,
	price: 0,
};

function increaseItem(
	array: TIngredient[],
	ingredient: TIngredient
): TIngredient[] {
	return [...array].map((item: TIngredient): TIngredient => {
		return item._id === ingredient._id
			? {
					...item,
					__v: ingredient.type === 'bun' ? item.__v + 2 : ++item.__v,
				}
			: item;
	});
}
function decreaseItem(
	array: TIngredient[],
	ingredient: TIngredient
): TIngredient[] {
	return [...array].map((item: TIngredient): TIngredient => {
		return item._id === ingredient._id
			? {
					...item,
					__v: ingredient.type === 'bun' ? item.__v - 2 : --item.__v,
				}
			: item;
	});
}

export const appReducer = (
	state = initialState,
	action: TIngredientsActions
) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				ingredientsRequest: true,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredientsRequestFailed: false,
				ingredients: action.ingredients,
				ingredientsRequest: false,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				ingredientsRequestFailed: true,
				ingredientsRequest: false,
			};
		}
		case ADD_INGREDIENT_TO_CONSTRUCTOR: {
			return {
				...state,
				constructorIngredients: [
					...state.constructorIngredients,
					{ ...action.ingredient.ingredient, key: action.ingredient.key },
				],
			};
		}
		case ADD_BUN_TO_CONSTRUCTOR: {
			return {
				...state,
				bun: action.ingredient,
			};
		}
		case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
			state.constructorIngredients.splice(action.index, 1);
			return {
				...state,
				constructorIngredients: state.constructorIngredients,
			};
		}
		case INCREASE_ITEM: {
			const isBun: boolean = action.ingredient.type === 'bun';
			return {
				...state,
				ingredients: increaseItem(state.ingredients, action.ingredient),
				constructorIngredients: increaseItem(
					state.constructorIngredients,
					action.ingredient
				),
				price:
					state.price +
					(isBun ? action.ingredient.price * 2 : action.ingredient.price),
			};
		}
		case DECREASE_ITEM: {
			const isBun: boolean = action.item.type === 'bun';
			return {
				...state,
				ingredients: decreaseItem(state.ingredients, action.item),
				constructorIngredients: decreaseItem(
					state.constructorIngredients,
					action.item
				),
				price:
					state.price - (isBun ? action.item.price * 2 : action.item.price),
			};
		}
		case SWAP_ITEMS: {
			return {
				...state,
				constructorIngredients: [...action.newarr],
			};
		}
		default: {
			return state;
		}
	}
};

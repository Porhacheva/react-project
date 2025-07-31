import {
	OPEN_INGREDIENTS_MODAL,
	CLOSE_INGREDIENTS_MODAL,
} from '../actions/currentIngredient';
import { TIngredient } from '../types';
import { TIngredientsActions } from '../types/actions';

type TIngredientState = {
	currentIngredient: TIngredient | null;
	isModalOpen: boolean;
};

export const ingredientsState: TIngredientState = {
	currentIngredient: null,
	isModalOpen: false,
};

export const ingredientsReducer = (
	state = ingredientsState,
	action: TIngredientsActions
) => {
	switch (action.type) {
		case OPEN_INGREDIENTS_MODAL: {
			return {
				...state,
				isModalOpen: true,
				currentIngredient: action.ingredient,
			};
		}
		case CLOSE_INGREDIENTS_MODAL: {
			return {
				...state,
				isModalOpen: false,
				currentIngredient: null,
			};
		}
		default: {
			return state;
		}
	}
};

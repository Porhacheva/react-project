import {
	OPEN_INGREDIENTS_MODAL,
	CLOSE_INGREDIENTS_MODAL,
} from '../actions/currentIngredient';

const ingredientsState = {
	currentIngredient: null,
	isModalOpen: false,
};

export const ingredientsReducer = (state = ingredientsState, action: any) => {
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

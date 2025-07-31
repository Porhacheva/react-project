import { ingredientsReducer, ingredientsState } from './currentIngredient';
import {
	OPEN_INGREDIENTS_MODAL,
	CLOSE_INGREDIENTS_MODAL,
} from '../actions/currentIngredient';

const mockIngredient = {
	_id: '60cb37bc6c007b002732282b',
	name: 'Соус традиционный галактический',
	type: 'sauce',
	proteins: 42,
	fat: 24,
	carbohydrates: 42,
	calories: 99,
	price: 15,
	image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
	__v: 0,
};

describe('ingredientsReducer', () => {
	it('should return the initial state', () => {
		expect(ingredientsReducer(undefined, {})).toEqual(ingredientsState);
	});

	it('should handle OPEN_INGREDIENTS_MODAL', () => {
		const action = {
			type: OPEN_INGREDIENTS_MODAL,
			ingredient: mockIngredient,
		};
		const newState = ingredientsReducer(ingredientsState, action);
		expect(newState).toEqual({
			...ingredientsState,
			isModalOpen: true,
			currentIngredient: mockIngredient,
		});
	});

	it('should handle CLOSE_INGREDIENTS_MODAL', () => {
		const stateWithModalOpen = {
			isModalOpen: true,
			currentIngredient: mockIngredient,
		};
		const action = {
			type: CLOSE_INGREDIENTS_MODAL,
		};
		const newState = ingredientsReducer(stateWithModalOpen, action);
		expect(newState).toEqual({
			...stateWithModalOpen,
			isModalOpen: false,
			currentIngredient: null,
		});
	});
});

import { appReducer } from './app';
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

const initialState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsRequestFailed: false,
	constructorIngredients: [],
	bun: null,
	price: 0,
};

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
const mockBun = {
	_id: '60666c42cc7b410027a1a9b1',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 10,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

const mockIngredients = [mockIngredient, mockBun];

describe('appReducer', () => {
	it('should return the initial state', () => {
		expect(appReducer(undefined, {})).toEqual(initialState);
	});

	it('should handle GET_INGREDIENTS_REQUEST', () => {
		expect(appReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual(
			{
				...initialState,
				ingredientsRequest: true,
			}
		);
	});

	it('should handle GET_INGREDIENTS_SUCCESS', () => {
		expect(
			appReducer(
				{
					...initialState,
					ingredientsRequest: true,
				},
				{
					type: GET_INGREDIENTS_SUCCESS,
					ingredients: mockIngredients,
				}
			)
		).toEqual({
			...initialState,
			ingredients: mockIngredients,
			ingredientsRequest: false,
			ingredientsRequestFailed: false,
		});
	});

	it('should handle GET_INGREDIENTS_FAILED', () => {
		expect(
			appReducer(
				{
					...initialState,
					ingredientsRequest: true,
				},
				{
					type: GET_INGREDIENTS_FAILED,
				}
			)
		).toEqual({
			...initialState,
			ingredientsRequest: false,
			ingredientsRequestFailed: true,
		});
	});

	it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
		const action = {
			type: ADD_INGREDIENT_TO_CONSTRUCTOR,
			ingredient: { ingredient: mockIngredient, key: 'unique-key' },
		};
		expect(appReducer(initialState, action)).toEqual({
			...initialState,
			constructorIngredients: [{ ...mockIngredient, key: 'unique-key' }],
		});
	});

	it('should handle ADD_BUN_TO_CONSTRUCTOR', () => {
		const action = {
			type: ADD_BUN_TO_CONSTRUCTOR,
			ingredient: mockBun,
		};
		expect(appReducer(initialState, action)).toEqual({
			...initialState,
			bun: mockBun,
		});
	});
	it('should handle DELETE_INGREDIENT_FROM_CONSTRUCTOR', () => {
		const stateWithIngredients = {
			...initialState,
			constructorIngredients: [
				mockIngredient,
				{ ...mockIngredient, _id: '456' },
			],
		};
		const action = {
			type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
			index: 0,
		};
		const newState = appReducer(stateWithIngredients, action);
		expect(newState.constructorIngredients.length).toBe(1);
		expect(newState.constructorIngredients[0]._id).toBe('456');
	});

	it('should handle INCREASE_ITEM', () => {
		const action = {
			type: INCREASE_ITEM,
			ingredient: mockIngredient,
		};
		const result = appReducer(initialState, action);
		expect(result.price).toBe(initialState.price + mockIngredient.price);
	});

	it('should handle INCREASE_ITEM for bun', () => {
		const action = {
			type: INCREASE_ITEM,
			ingredient: mockBun,
		};
		const result = appReducer(initialState, action);
		expect(result.price).toBe(initialState.price + mockBun.price * 2);
	});

	it('should handle DECREASE_ITEM', () => {
		const stateWithPrice = {
			...initialState,
			price: 200,
		};
		const action = {
			type: DECREASE_ITEM,
			item: mockIngredient,
		};
		const result = appReducer(stateWithPrice, action);
		expect(result.price).toBe(185);
	});

	it('should handle DECREASE_ITEM for bun', () => {
		const stateWithPrice = {
			...initialState,
			price: 200,
		};
		const action = {
			type: DECREASE_ITEM,
			item: mockBun,
		};
		const result = appReducer(stateWithPrice, action);
		expect(result.price).toBe(180);
	});

	it('should handle SWAP_ITEMS', () => {
		const newarr = [
			{ ...mockIngredient, key: 'a' },
			{ ...mockIngredient, key: 'b' },
		];
		const action = {
			type: SWAP_ITEMS,
			newarr,
		};
		expect(appReducer(initialState, action)).toEqual({
			...initialState,
			constructorIngredients: newarr,
		});
	});
});

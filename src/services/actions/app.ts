import { url } from '@/utils/constants';
import { doRequest } from '@/utils/helper';
import { TIngredientData } from '../types/api';
import { AppDispatch } from '../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
	'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
	'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
	'GET_INGREDIENTS_FAILED' as const;

export function getIngredients(): (dispatch: AppDispatch) => Promise<void> {
	return async function (dispatch: AppDispatch): Promise<void> {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		try {
			const ingredients: TIngredientData = await doRequest(
				url.apiUrl + url.ingredientsUrl
			);
			dispatch({
				type: GET_INGREDIENTS_SUCCESS,
				ingredients: ingredients.data,
			});
		} catch {
			dispatch({
				type: GET_INGREDIENTS_FAILED,
			});
		}
	};
}

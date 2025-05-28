import { url } from '@/utils/constants';
import { doRequest } from '@/utils/helper';
import { TIngredientData } from '@/utils/types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
	return async function (dispatch: (...args: any[]) => any) {
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
		} catch (error) {
			dispatch({
				type: GET_INGREDIENTS_FAILED,
			});
		}
	};
}

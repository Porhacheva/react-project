import { TDispatch } from '@/main';
import { url } from '@/utils/constants';
import { doRequest } from '@/utils/helper';
import { TIngredientData } from '@/utils/types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients(): (dispatch: TDispatch) => Promise<void> {
	return async function (dispatch: TDispatch): Promise<void> {
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

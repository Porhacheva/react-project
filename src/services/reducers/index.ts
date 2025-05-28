import { combineReducers } from 'redux';
import { appReducer } from './app';
import { ingredientsReducer } from './currentIngredient';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
	app: appReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
});

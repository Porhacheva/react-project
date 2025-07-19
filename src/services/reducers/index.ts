import { combineReducers } from 'redux';
import { appReducer } from './app';
import { ingredientsReducer } from './currentIngredient';
import { orderReducer } from './order';
import { registrationReducer } from './registration';
import { wsReducer } from './ws-reducer';

export const rootReducer = combineReducers({
	app: appReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
	registration: registrationReducer,
	feed: wsReducer,
});

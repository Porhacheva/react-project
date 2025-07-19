import { TIngredient } from '.';

export type TIngredientData = {
	data: TIngredient[];
	success: boolean;
};

export type TUser = {
	email: string;
	name: string;
	password?: string;
};

export type TPostResetPasswordRequest = {
	password: string;
	token: string;
};

export type TPostRegistrationRequest = {
	email: string;
	password: string;
	name: string;
};

export type TPostLoginRequest = {
	email: string;
	password: string;
};

export type TResponce = {
	success: boolean;
	message: string;
};

export type TPostLoginResponce = {
	success: boolean;
	accessToken?: string;
	refreshToken?: string;
	user: TUser;
	message?: string;
};

export type TPostTokenResponce = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

export type TOrderResponce = {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
};

export type TOrderData = {
	ingredients: string[];
	_id: string;
	status: string;
	name: string;
	number: number;
	createdAt: string;
	updatedAt: string;
};

export type TAllOrdersResponce = {
	success: boolean;
	orders: TOrderData[];
	total: number;
	totalToday: number;
};

export type TFeedOrderResponce = {
	success: boolean;
	orders: TOrderData[];
};

export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
	key?: string;
};

export type TIconTypes =
	| 'secondary'
	| 'primary'
	| 'error'
	| 'success'
	| 'disabled';

export type TIngredientData = {
	data: TIngredient[];
	success: boolean;
};

export type TAPIMethods = 'GET' | 'POST' | 'PATCH';

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

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

export type TAPIMethods = 'GET' | 'POST';

import { TAPIMethods, TIngredient } from '@/services/types';

export async function doRequest<T>(
	url: string,
	method?: TAPIMethods,
	data?: any
): Promise<T> {
	const res: Response = await fetch(url, {
		method: method || 'GET',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	const _data = await res.json();
	if (res.ok) {
		if (_data?.success) {
			return _data as T;
		} else {
			const responseText = await res.text();
			const errorString = JSON.parse(responseText);
			if (errorString['message'].includes('Token is invalid')) {
				throw Error(JSON.stringify(errorString));
			}
		}
	}
	return Promise.reject(_data?.message);
}
export async function doAuthRequest<T>(
	url: string,
	token: string,
	method?: TAPIMethods,
	data?: any
): Promise<T> {
	const res: Response = await fetch(url, {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie(token),
		},
		body: JSON.stringify(data),
	});
	const _data = await res.json();
	if (res.ok) {
		if (_data?.success) {
			return _data as T;
		} else {
			const responseText = await res.text();
			const errorString = JSON.parse(responseText);
			if (errorString['message'].includes('Token is invalid')) {
				throw Error(JSON.stringify(errorString));
			}
		}
	}
	return Promise.reject(_data?.message);
}

export function getCookie(name: string): string | undefined {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + '=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, props?: any): void {
	props = props || {};
	let exp = props.expires;
	if (typeof exp == 'number' && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000);
		exp = props.expires = d;
	}
	if (exp && exp.toUTCString) {
		props.expires = exp.toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + '=' + value;
	for (const propName in props) {
		updatedCookie += '; ' + propName;
		const propValue = props[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
	setCookie(name, null, { expires: -1 });
}

export function getToken(token: string | undefined): string | undefined {
	return token?.split('Bearer ')[1];
}

export function checkAuthToken(): string | undefined {
	return getCookie('token');
}

export function getOrderNumber(number: number): string {
	const stringNumber: string = number.toString();
	if (stringNumber.length < 6) {
		return stringNumber.padStart(6, '0');
	}
	return stringNumber;
}

export function getOrderIngredients(
	orderIds: string[],
	ingredients: TIngredient[]
): TIngredient[] {
	const orderIngredients: TIngredient[] = [];
	orderIds.map((id: string) => {
		const item: TIngredient | undefined = ingredients.find(
			(ingredient: TIngredient) => ingredient._id === id
		);
		if (item) {
			orderIngredients.push(item);
		}
	});
	return orderIngredients;
}

export function getOrderPrice(orderIngredients: TIngredient[]): number {
	let count: number = 0;
	orderIngredients.forEach((ingredient: TIngredient) => {
		count += ingredient.price;
	});
	return count;
}

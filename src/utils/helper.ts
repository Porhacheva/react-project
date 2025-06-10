import { TAPIMethods } from './types';

export async function doRequest(
	url: string,
	method?: TAPIMethods,
	data?: any
): Promise<any> {
	const res: any = await fetch(url, {
		method: method || 'GET',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (res.ok) {
		return await res.json();
	} else {
		const responseText = await res.text();
		const errorString = JSON.parse(responseText);
		if (errorString['message'].includes('Token is invalid')) {
			throw Error(JSON.stringify(errorString));
		}
	}
	return Promise.reject(`Ошибка ${res.status}`);
}
export async function doAuthRequest(
	url: string,
	token: string,
	method?: TAPIMethods,
	data?: any
): Promise<any> {
	const res: any = await fetch(url, {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie(token),
		},
		body: JSON.stringify(data),
	});
	if (res.ok) {
		return await res.json();
	} else {
		const responseText = await res.text();
		const errorString = JSON.parse(responseText);
		if (errorString['message'].includes('expired')) {
			throw Error(JSON.stringify(errorString));
		}
	}
	return Promise.reject(`Ошибка ${res}`);
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

export function checkAuthToken() {
	return getCookie('token');
}

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
	}
	return Promise.reject(`Ошибка ${res.status}`);
}

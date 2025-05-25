export async function doRequest(url: string): Promise<any> {
	const res: any = await fetch(url);
	if (res.ok) {
		return await res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
}

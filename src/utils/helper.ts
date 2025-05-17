export async function doRequest(url: string): Promise<any> {
	const res: any = await fetch(url);
	const data: any = await res.json();
	return data;
}

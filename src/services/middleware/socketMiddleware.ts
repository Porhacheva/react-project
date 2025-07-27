import { Middleware, MiddlewareAPI } from 'redux';
import { AppActions, AppDispatch, RootState, TWSStoreActions } from '../types';
import { TAllOrdersResponce } from '../types/api';
import { getCookie } from '@/utils/helper';

export const socketMiddleware = (
	wsUrl: string,
	wsActions: TWSStoreActions
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AppActions) => {
			const { dispatch, getState } = store;
			const { type } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
			const isFromProfile: boolean = getState().registration.loginTabIsActive;
			const accessToken: string | undefined = getCookie('token');
			if (type === wsInit) {
				const url: string = isFromProfile
					? wsUrl + `?token=${accessToken}`
					: wsUrl + '/all';
				socket = new WebSocket(url);
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData: TAllOrdersResponce = JSON.parse(data);
					const { success, ...restParsedData } = parsedData; // eslint-disable-line @typescript-eslint/no-unused-vars

					dispatch({ type: onMessage, payload: { ...restParsedData } });
				};

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
				};
			}
			next(action);
		};
	}) as Middleware;
};

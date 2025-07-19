import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.tsx';
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { thunk } from 'redux-thunk';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { wsUrl } from './utils/constants';
import {
	WS_CONNECTION_START,
	WS_SEND_MESSAGE,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_ERROR,
	WS_GET_MESSAGE,
} from './services/actions/ws-actions';
import { TWSStoreActions } from './services/types';

const wsActions: TWSStoreActions = {
	wsInit: WS_CONNECTION_START,
	wsSendMessage: WS_SEND_MESSAGE,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_MESSAGE,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
	applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);
export const store = createStore(rootReducer, enhancer);

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

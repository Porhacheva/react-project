import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import {
	FeedPage,
	ForgotPasswordPage,
	HistoryPage,
	HomePage,
	IngredientModalPage,
	LoginPage,
	NotFound404,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
} from '@/pages';
import { ProtectedRouteElement } from '../protected-route/protected-route';

export const App = (): React.JSX.Element => {
	return (
		<BrowserRouter>
			<AppHeader />
			<Routes>
				<Route path='/' element={<HomePage />}>
					<Route path='/ingredients/:id' element={<IngredientModalPage />} />
				</Route>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/feed' element={<FeedPage />} />
				<Route
					path='/profile'
					element={<ProtectedRouteElement element={<ProfilePage />} />}>
					<Route path='orders' element={<HistoryPage />} />
				</Route>
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='/reset-password' element={<ResetPasswordPage />} />
				<Route path='*' element={<NotFound404 />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

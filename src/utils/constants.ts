interface IUrl {
	[name: string]: string;
}

export const url: IUrl = {
	apiUrl: 'https://norma.nomoreparties.space/api',
	auth: '/auth',
	ingredientsUrl: '/ingredients',
	orderUrl: '/orders',
	userUrl: '/user',
	loginUrl: '/login',
	logoutUrl: '/logout',
	registerUrl: '/register',
	tokenUrl: '/token',
	passwordForgotUrl: '/password-reset',
	passwordResetUrl: '/reset',
};

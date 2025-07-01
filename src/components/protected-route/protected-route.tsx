import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '@/services/actions/registration';
import { checkAuthToken } from '@/utils/helper';
import { TDispatch, TState } from '@/main';

type TProtectedRouteProps = {
	element: React.JSX.Element;
};

export const ProtectedRouteElement = ({
	element,
}: TProtectedRouteProps): React.JSX.Element | null => {
	const dispatch = useDispatch<TDispatch>();
	const { isAuth } = useSelector((state: TState) => state.registration);
	const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

	const init = async (): Promise<void> => {
		if (checkAuthToken()) {
			dispatch({ type: AUTH });
		}
		setUserLoaded(true);
	};

	useEffect((): void => {
		init();
	}, []);

	if (!isUserLoaded) {
		return null;
	}

	return isAuth ? element : <Navigate to='/login' replace />;
};

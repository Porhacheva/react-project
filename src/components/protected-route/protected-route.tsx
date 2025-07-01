import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '@/services/actions/registration';
import { checkAuthToken } from '@/utils/helper';

export const ProtectedRouteElement = ({
	element,
}): React.JSX.Element | null => {
	const dispatch: (...args: any[]) => any = useDispatch();
	const { isAuth } = useSelector((state: any) => state.registration);
	const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

	const init = async (): Promise<void> => {
		if (checkAuthToken()) {
			dispatch({ type: AUTH });
		}
		setUserLoaded(true);
	};

	useEffect(() => {
		init();
	}, []);

	if (!isUserLoaded) {
		return null;
	}

	return isAuth ? element : <Navigate to='/login' replace />;
};

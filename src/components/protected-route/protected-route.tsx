import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AUTH } from '@/services/actions/registration';
import { checkAuthToken } from '@/utils/helper';
import { useDispatch, useSelector } from '@/services/types/hooks';

type TProtectedRouteProps = {
	element: React.JSX.Element;
};

export const ProtectedRouteElement = ({
	element,
}: TProtectedRouteProps): React.JSX.Element | null => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector((state) => state.registration);
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

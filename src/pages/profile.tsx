import { Link, NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import {
	PROFILE_TAB_IS_ACTIVE,
	HISTORY_TAB_IS_ACTIVE,
	LOGOUT_TAB_IS_ACTIVE,
	postLogout,
	getAuthUser,
	patchUser,
	postRefreshToken,
	LOGOUT,
} from '@/services/actions/registration';
import { useEffect, useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/profile.module.css';
import { Preloader } from '@/components/preloader/preloader';
import { deleteCookie } from '@/utils/helper';
import { useDispatch, useSelector } from '@/services/types/hooks';
import { TUser } from '@/services/types/api';

export const ProfilePage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();
	const {
		registrationRequest,
		profileTabIsActive,
		historyTabIsActive,
		logoutTabIsActive,
		name,
		email,
		password,
	} = useSelector((state) => state.registration);
	useEffect((): void => {
		init();
	}, []);
	const [newName, setName] = useState<string>(name);
	const [newEmail, setEmail] = useState<string>(email);
	const [newPassword, setPassword] = useState<string>(password || '12345');

	async function tryAgain(): Promise<void> {
		try {
			await dispatch(postRefreshToken());
			await dispatch(getAuthUser());
		} catch (error: any) {
			if (error.message.includes('Token is invalid')) {
				dispatch({ type: LOGOUT });
				deleteCookie('token');
				deleteCookie('refreshToken');
			}
		}
	}

	const init = async (): Promise<void> => {
		try {
			await dispatch(getAuthUser());
		} catch {
			await tryAgain();
		}
		setActiveProfileTab();
	};

	const setActiveProfileTab = (): void => {
		dispatch({ type: PROFILE_TAB_IS_ACTIVE });
	};
	const setActiveHistoryTab = (): void => {
		dispatch({ type: HISTORY_TAB_IS_ACTIVE });
	};
	const logout = (): void => {
		dispatch({ type: LOGOUT_TAB_IS_ACTIVE });
		dispatch(postLogout());
		navigate('/login');
	};
	const reset = (): void => {
		setName(name);
		setEmail(email);
		setPassword(password!);
	};

	const save = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const data: TUser = {
			name: newName,
			email: newEmail,
			password: newPassword,
		};
		dispatch(patchUser(data));
	};

	return (
		<div className={styles['profile-page']}>
			<div className={`${styles.menu} mr-15`}>
				<Link
					to={'/profile'}
					className={
						'text_type_main-medium ' +
						(profileTabIsActive ? 'text_color_primary' : 'text_color_inactive')
					}
					onClick={setActiveProfileTab}>
					Профиль
				</Link>
				<Link
					to={'/profile/orders'}
					className={
						'text_type_main-medium ' +
						(historyTabIsActive ? 'text_color_primary' : 'text_color_inactive')
					}
					onClick={setActiveHistoryTab}>
					История заказов
				</Link>
				<button
					className={
						'text_type_main-medium ' +
						(logoutTabIsActive ? 'text_color_primary' : 'text_color_inactive')
					}
					onClick={logout}>
					Выход
				</button>
				<span className='text_type_main-default text_color_inactive mt-20'>
					В этом разделе вы можете изменить свои персональные данные
				</span>
			</div>
			{registrationRequest ? (
				<Preloader />
			) : historyTabIsActive ? (
				<Outlet />
			) : (
				<form onSubmit={save} className={styles['edit-block']}>
					<Input
						value={newName}
						type='text'
						placeholder='Имя'
						icon='EditIcon'
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						value={newEmail}
						type='email'
						placeholder='Логин'
						icon='EditIcon'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						value={newPassword}
						type='password'
						placeholder='Пароль'
						icon='EditIcon'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button htmlType={'submit'} type='primary'>
						Сохранить
					</Button>
					<Button htmlType={'button'} type='secondary' onClick={reset}>
						Отмена
					</Button>
				</form>
			)}
		</div>
	);
};

import { useDispatch, useSelector } from 'react-redux';
import {
	Link,
	Navigate,
	NavigateFunction,
	useNavigate,
} from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useEffect, useState } from 'react';
import { postEmailToResetPassword } from '@/services/actions/registration';
import { checkAuthToken } from '@/utils/helper';
import { TDispatch, TState } from '@/main';

export const ForgotPasswordPage = (): React.JSX.Element => {
	const [value, setValue] = useState<string>('');
	const dispatch = useDispatch<TDispatch>();
	const navigate: NavigateFunction = useNavigate();
	const { revivePasswordPageIsVisited } = useSelector(
		(state: TState) => state.registration
	);

	const revivePassword = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		dispatch(postEmailToResetPassword(value));
	};

	useEffect((): void => {
		if (checkAuthToken()) {
			navigate('/profile');
		}
	}, []);

	if (revivePasswordPageIsVisited) {
		return <Navigate to='/reset-password' replace />;
	}

	return (
		<div className={styles['login-page']}>
			<form onSubmit={revivePassword} className={styles.form}>
				<span className='text_type_main-medium'>Восстановление пароля</span>
				<Input
					value={value}
					type='email'
					placeholder='Укажите e-mail'
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button htmlType={'submit'} type='primary'>
					Восстановить
				</Button>
				<div className='mt-15'>
					<span className='text_type_main-default text_color_inactive pr-2'>
						Вспомнили пароль?
					</span>
					<Link to={'/login'}>
						<Button
							htmlType={'button'}
							type='secondary'
							extraClass={styles['login-button']}>
							Войти
						</Button>
					</Link>
				</div>
			</form>
		</div>
	);
};

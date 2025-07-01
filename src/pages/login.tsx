import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	MAIN_TAB_IS_ACTIVE,
	postLogin,
	SAVE_PASSWORD,
} from '@/services/actions/registration';
import { TPostLoginResponce } from '@/utils/types';
import { useDispatch } from 'react-redux';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { checkAuthToken } from '@/utils/helper';

export const LoginPage = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | undefined>('');
	const dispatch: (...args: any[]) => any = useDispatch();
	const navigate = useNavigate();

	const logIn = async (e: any): Promise<void> => {
		e.preventDefault();
		if (error?.length) {
			setError('');
		}
		try {
			const data: TPostLoginResponce = await dispatch(
				postLogin({ email, password })
			);
			if (data.success) {
				navigate('/');
				dispatch({ type: SAVE_PASSWORD, password });
				dispatch({ type: MAIN_TAB_IS_ACTIVE });
			} else {
				setError(data.message);
			}
		} catch (error) {
			setError('Произошла ошибка. Попробуйте снова');
		}
	};

	useEffect(() => {
		if (checkAuthToken()) {
			navigate('/profile');
		}
	}, []);

	return (
		<div className={styles['login-page']}>
			<form onSubmit={logIn} className={styles.form}>
				<span className='text_type_main-medium'>Вход</span>
				<Input
					value={email}
					type='email'
					placeholder='E-mail'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					value={password}
					type='password'
					placeholder='Пароль'
					icon='ShowIcon'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button htmlType={'submit'} type='primary'>
					Войти
				</Button>
				<span>{error}</span>
				<div className={`${styles['button-block']} mt-15`}>
					<div className='mb-4'>
						<span className='text_type_main-default text_color_inactive pr-2'>
							Вы — новый пользователь?
						</span>
						<Link to={'/register'}>
							<Button
								htmlType={'button'}
								type='secondary'
								extraClass={styles['login-button']}>
								Зарегистрироваться
							</Button>
						</Link>
					</div>
					<div>
						<span className='text_type_main-default text_color_inactive pr-2'>
							Забыли пароль?
						</span>
						<Link to={'/forgot-password'}>
							<Button
								htmlType={'button'}
								type='secondary'
								extraClass={styles['login-button']}>
								Восстановить пароль
							</Button>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

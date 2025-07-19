import { useEffect, useState } from 'react';
import {
	Link,
	Navigate,
	NavigateFunction,
	useNavigate,
} from 'react-router-dom';
import { postLogin } from '@/services/actions/registration';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles/login.module.css';
import { checkAuthToken } from '@/utils/helper';
import { useDispatch, useSelector } from '@/services/types/hooks';

export const LoginPage = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();
	const { isAuth, error } = useSelector((state) => state.registration);

	const logIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		dispatch(postLogin({ email, password }));
	};

	useEffect((): void => {
		if (checkAuthToken()) {
			navigate('/profile');
		}
	}, []);

	if (isAuth) {
		return <Navigate to='/' replace />;
	}

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

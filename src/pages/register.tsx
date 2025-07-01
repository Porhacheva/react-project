import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { postRegistration } from '@/services/actions/registration';
import { checkAuthToken } from '@/utils/helper';
import { TDispatch, TState } from '@/main';

export const RegisterPage = (): React.JSX.Element => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useDispatch<TDispatch>();
	const navigate: NavigateFunction = useNavigate();
	const { isAuth, error } = useSelector((state: TState) => state.registration);

	const register = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		dispatch(postRegistration({ email, password, name }));
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
			<form onSubmit={register} className={styles.form}>
				<span className='text_type_main-medium'>Регистрация</span>
				<Input
					value={name}
					type='text'
					placeholder='Имя'
					onChange={(e) => setName(e.target.value)}
				/>
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
					Зарегистрироваться
				</Button>
				<span>{error}</span>
				<div className='mt-15'>
					<span className='text_type_main-default text_color_inactive pr-2'>
						Уже зарегистрированы?
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

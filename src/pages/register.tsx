import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import {
	MAIN_TAB_IS_ACTIVE,
	postRegistration,
	SAVE_PASSWORD,
} from '@/services/actions/registration';
import { TPostLoginResponce } from '@/utils/types';
import { checkAuthToken } from '@/utils/helper';

export const RegisterPage = (): React.JSX.Element => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | undefined>('');
	const dispatch: (...args: any[]) => any = useDispatch();
	const navigate = useNavigate();

	const register = async (e: any): Promise<void> => {
		e.preventDefault();
		if (error?.length) {
			setError('');
		}
		try {
			const data: TPostLoginResponce = await dispatch(
				postRegistration({ email, password, name })
			);
			if (data.success) {
				navigate('/');
				dispatch({ type: SAVE_PASSWORD, password });
				dispatch({ type: MAIN_TAB_IS_ACTIVE });
			} else {
				setError(data?.message);
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

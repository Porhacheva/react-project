import { useDispatch } from 'react-redux';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useEffect, useState } from 'react';
import {
	postEmailToResetPassword,
	REVIVE_PASSWORD_PAGE_IS_VISITED,
} from '@/services/actions/registration';
import { TPostResetPasswordResponce } from '@/utils/types';
import { checkAuthToken } from '@/utils/helper';

export const ForgotPasswordPage = (): React.JSX.Element => {
	const [value, setValue] = useState<string>('');
	const dispatch: (...args: any[]) => any = useDispatch();
	const navigate: NavigateFunction = useNavigate();

	const revivePassword = async (): Promise<void> => {
		const data: TPostResetPasswordResponce = await dispatch(
			postEmailToResetPassword(value)
		);
		if (data.success) {
			dispatch({ type: REVIVE_PASSWORD_PAGE_IS_VISITED });
			navigate('/reset-password');
		}
	};

	useEffect(() => {
		if (checkAuthToken()) {
			navigate('/profile');
		}
	}, []);

	return (
		<div className={styles['login-page']}>
			<span className='text_type_main-medium'>Восстановление пароля</span>
			<Input
				value={value}
				type='email'
				placeholder='Укажите e-mail'
				onChange={(e) => setValue(e.target.value)}
			/>
			<Button htmlType={'button'} type='primary' onClick={revivePassword}>
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
		</div>
	);
};

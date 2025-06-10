import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { postResetPassword } from '@/services/actions/registration';
import { TPostResetPasswordRequest } from '@/utils/types';

export const ResetPasswordPage = (): React.JSX.Element => {
	const [newPassword, setNewPassword] = useState<string>('');
	const [code, setCode] = useState<string>('');
	const dispatch: (...args: any[]) => any = useDispatch();
	const { revivePasswordPageIsVisited } = useSelector(
		(state: any) => state.registration
	);
	const navigate = useNavigate();

	const savePassword = async (): Promise<void> => {
		const resetObject: TPostResetPasswordRequest = {
			password: newPassword,
			token: code,
		};
		await dispatch(postResetPassword(resetObject));
		navigate('/login');
	};

	useEffect(() => {
		if (!revivePasswordPageIsVisited) {
			navigate('/forgot-password');
		}
	}, []);

	return (
		<div className={styles['login-page']}>
			<form onSubmit={savePassword} className={styles.form}>
				<span className='text_type_main-medium'>Восстановление пароля</span>
				<Input
					value={newPassword}
					type='password'
					placeholder='Введите новый пароль'
					icon='ShowIcon'
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<Input
					value={code}
					type='text'
					placeholder='Введите код из письма'
					onChange={(e) => setCode(e.target.value)}
				/>
				<Button htmlType={'submit'} type='primary'>
					Сохранить
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

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	MAIN_TAB_IS_ACTIVE,
	FEED_TAB_IS_ACTIVE,
	LOGIN_TAB_IS_ACTIVE,
} from '@/services/actions/registration';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { TDispatch, TState } from '@/main';

export const AppHeader = (): React.JSX.Element => {
	const dispatch = useDispatch<TDispatch>();
	const { mainTabIsActive, feedTabIsActive, loginTabIsActive } = useSelector(
		(state: TState) => state.registration
	);
	const setActiveMainTab = (): void => {
		dispatch({ type: MAIN_TAB_IS_ACTIVE });
	};
	const setActiveFeedTab = (): void => {
		dispatch({ type: FEED_TAB_IS_ACTIVE });
	};
	const setActiveProfileTab = (): void => {
		dispatch({ type: LOGIN_TAB_IS_ACTIVE });
	};

	useEffect((): void => {
		const endpoint: string = window.location.href.split('/').slice(-1)[0];
		if (
			endpoint === 'profile' ||
			endpoint === 'login' ||
			endpoint === 'register' ||
			endpoint === 'forgot-password'
		) {
			setActiveProfileTab();
		} else if (endpoint === 'feed') {
			setActiveFeedTab();
		} else {
			setActiveMainTab();
		}
	}, []);

	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<Link
						to={'/'}
						className={`${styles.link} ${mainTabIsActive ? `${styles.link_active}` : ''}`}
						onClick={setActiveMainTab}>
						<BurgerIcon type={mainTabIsActive ? 'primary' : 'secondary'} />
						<p className='text text_type_main-default ml-2'>Конструктор</p>
					</Link>
					<Link
						to={'/feed'}
						className={`${styles.link} ml-10 ${feedTabIsActive ? `${styles.link_active}` : ''}`}
						onClick={setActiveFeedTab}>
						<ListIcon type={feedTabIsActive ? 'primary' : 'secondary'} />
						<p className='text text_type_main-default ml-2'>Лента заказов</p>
					</Link>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<Link
					to={'/profile'}
					className={`${styles.link} ${styles.link_position_last} ${loginTabIsActive ? `${styles.link_active}` : ''}`}
					onClick={setActiveProfileTab}>
					<ProfileIcon type={loginTabIsActive ? 'primary' : 'secondary'} />
					<p className='text text_type_main-default ml-2'>Личный кабинет</p>
				</Link>
			</nav>
		</header>
	);
};

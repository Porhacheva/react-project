import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_START,
} from '@/services/actions/ws-actions';
import { useDispatch, useSelector } from '@/services/types/hooks';
import { useEffect } from 'react';
import feedStyles from './styles/feed.module.css';
import styles from '../components/app/app.module.css';
import { TOrderData } from '@/services/types/api';
import { Preloader } from '@/components/preloader/preloader';
import { OrderItem } from '@/components/order/order-item/order-item';
import { OrdersBoard } from '@/components/order/orders-board/orders-board';
import { Outlet } from 'react-router-dom';

export const FeedPage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { wsConnected, orders, total, totalToday } = useSelector(
		(state) => state.feed
	);

	useEffect(() => {
		dispatch({ type: WS_CONNECTION_START });
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [dispatch]);

	return (
		<div className={styles.app}>
			{wsConnected && orders.length ? (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Лента заказов
					</h1>
					<div className={`${styles.main} pl-5 pr-5`}>
						<section
							className={`${feedStyles.column} ${feedStyles['orders-list']} custom-scroll`}>
							{orders.map((order: TOrderData): React.JSX.Element => {
								return <OrderItem order={order} key={order._id} />;
							})}
						</section>
						<section className={feedStyles.column}>
							<OrdersBoard />
							<div className='text_type_main-medium mt-15 mb-15'>
								Выполнено за все время:
								<div className='text_type_digits-large'>{total}</div>
							</div>
							<div className='text_type_main-medium'>
								Выполнено за сегодня:
								<div className='text_type_digits-large'>{totalToday}</div>
							</div>
						</section>
					</div>
				</>
			) : (
				<Preloader />
			)}
			<Outlet />
		</div>
	);
};

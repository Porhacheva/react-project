import { Preloader } from '@/components/preloader/preloader';
import {
	WS_CONNECTION_START,
	WS_CONNECTION_CLOSED,
} from '@/services/actions/ws-actions';
import { TOrderData } from '@/services/types/api';
import { useDispatch, useSelector } from '@/services/types/hooks';
import { useEffect } from 'react';
import feedStyles from './styles/feed.module.css';
import { OrderItem } from '@/components/order/order-item/order-item';
import { Outlet } from 'react-router-dom';

export const HistoryPage = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { wsConnected, orders } = useSelector((state) => state.feed);

	useEffect(() => {
		dispatch({ type: WS_CONNECTION_START });
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [dispatch]);

	return (
		<>
			{wsConnected ? (
				orders.length ? (
					<section
						className={`${feedStyles.column} ${feedStyles['orders-list']} custom-scroll`}>
						{orders.map((order: TOrderData): React.JSX.Element => {
							return <OrderItem order={order} key={order._id} />;
						})}
					</section>
				) : (
					<div className='text_type_main-medium'>Пока нет заказов</div>
				)
			) : (
				<Preloader />
			)}
			<Outlet />
		</>
	);
};

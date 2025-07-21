import { TOrderData } from '@/services/types/api';
import { useDispatch, useSelector } from '@/services/types/hooks';
import styles from './order-item.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { TIngredient } from '@/services/types';
import { Price } from '@/components/price/price';
import { ImagesStack } from '../images-stack/images-stack';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	getOrderIngredients,
	getOrderNumber,
	getOrderPrice,
} from '@/utils/helper';
import { Link, useLocation } from 'react-router-dom';
import { SELECT_ORDER } from '@/services/actions/order';

type TFOrderItemProps = {
	order: TOrderData;
};

export const OrderItem = ({ order }: TFOrderItemProps): React.JSX.Element => {
	const [currentIngredients, setIngredients] = useState<TIngredient[]>([]);
	const [number, setOrderNumber] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const { ingredients } = useSelector((state) => state.app);
	const { loginTabIsActive } = useSelector((state) => state.registration);
	const { state } = useLocation();
	const dispatch = useDispatch();

	const handleOpenModal = (): void => {
		dispatch({ type: SELECT_ORDER, order });
	};

	function getStatus(status: string): ReactNode | null {
		switch (status) {
			case 'created':
				return <div className='text_type_main-default mt-2 mb-6'>Создан</div>;
			case 'pending':
				return (
					<div className='text_type_main-default mt-2 mb-6'>Готовится</div>
				);
			case 'done':
				return (
					<div className='text_type_main-default mt-2 mb-6 text_color_success'>
						Выполнен
					</div>
				);
			default:
				return null;
		}
	}

	useEffect((): void => {
		const orderIngredients: TIngredient[] = getOrderIngredients(
			order.ingredients,
			ingredients
		);

		setIngredients(orderIngredients);
		setPrice(getOrderPrice(orderIngredients));
		setOrderNumber(getOrderNumber(order.number));
	}, []);

	return (
		<Link
			to={`/${loginTabIsActive ? 'profile/orders' : 'feed'}/${order._id}`}
			state={state}
			onClick={handleOpenModal}
			key={order._id}>
			<div className={`${styles.card} mb-4 mr-2 p-6`}>
				<div className={styles.info}>
					<p className='text_type_digits-default'>#{number}</p>
					<p className='text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(order.createdAt)} />
					</p>
				</div>
				<div className='text_type_main-medium mt-6 mb-6'>{order.name}</div>
				{loginTabIsActive ? getStatus(order.status) : null}
				<div className={styles.price}>
					<ImagesStack ingredients={currentIngredients} />
					<Price price={price} />
				</div>
			</div>
		</Link>
	);
};

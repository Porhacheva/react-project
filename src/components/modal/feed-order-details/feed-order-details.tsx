import { Price } from '@/components/price/price';
import { TIngredient } from '@/services/types';
import { useDispatch, useSelector } from '@/services/types/hooks';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, ReactNode, useEffect } from 'react';
import styles from './feed-order-details.module.css';
import {
	getOrderIngredients,
	getOrderNumber,
	getOrderPrice,
} from '@/utils/helper';
import { IngredientsList } from './ingredients-list/ingredients-list';

export const FeedOrderDetails = (): React.JSX.Element => {
	const [currentIngredients, setIngredients] = useState<TIngredient[]>([]);
	const [number, setOrderNumber] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const { orderObject } = useSelector((state) => state.order);
	const { ingredients } = useSelector((state) => state.app);
	const dispatch = useDispatch();

	useEffect((): void => {
		if (orderObject) {
			const orderIngredients: TIngredient[] = getOrderIngredients(
				orderObject?.ingredients,
				ingredients
			);

			setIngredients(orderIngredients);
			setPrice(getOrderPrice(orderIngredients));
			setOrderNumber(getOrderNumber(orderObject.number!));
		}
	}, [dispatch, orderObject]);

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

	return (
		<div className={styles.order}>
			<div className={`${styles.number} text_type_digits-default mb-10`}>
				#{number}
			</div>
			<div className='text_type_main-medium mb-3'>{orderObject?.name}</div>
			<div className='mb-15'>
				{orderObject && getStatus(orderObject?.status)}
			</div>
			<div className='text_type_main-medium mb-6'>Состав:</div>
			<IngredientsList ingredients={currentIngredients} />
			<div className={`${styles.info} `}>
				{orderObject && (
					<FormattedDate
						date={new Date(orderObject?.createdAt)}
						className='text_type_main-default text_color_inactive mt-10'
					/>
				)}
				<Price price={price} />
			</div>
		</div>
	);
};

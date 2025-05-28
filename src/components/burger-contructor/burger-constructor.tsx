import { TIngredient } from '@utils/types.ts';
import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorList } from './constructor-list/constructor-list';
import { Price } from '@/components/price/price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../modal/order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_ORDER_MODAL, createOrder } from '../../services/actions/order';
import {
	ADD_BUN_TO_CONSTRUCTOR,
	ADD_INGREDIENT_TO_CONSTRUCTOR,
	DECREASE_ITEM,
	INCREASE_ITEM,
} from '../../services/actions/constructor';
import { useDrop } from 'react-dnd';

export const BurgerConstructor = (): React.JSX.Element => {
	const dispatch: (...args: any[]) => any = useDispatch();
	const { constructorIngredients, bun, price } = useSelector(
		(state: any) => state.app
	);
	const { orderNumber, isModalOpen } = useSelector((state: any) => state.order);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(item) {
			handleDrop(item);
		},
	});

	const handleOpenModal = () => {
		if (!(constructorIngredients.length || bun)) {
			return;
		}
		const ingredientsIds: string[] = constructorIngredients.map(
			(item: TIngredient) => {
				return item._id;
			}
		);
		bun && ingredientsIds.push(...[bun._id, bun._id]);
		dispatch(createOrder({ ingredients: ingredientsIds }));
	};

	const handleCloseModal = () => {
		dispatch({ type: CLOSE_ORDER_MODAL });
	};

	const handleDrop = (item: any) => {
		if (item.ingredient.type === 'bun') {
			dispatch({ type: ADD_BUN_TO_CONSTRUCTOR, ...item });
			if (bun) {
				dispatch({ type: DECREASE_ITEM, item: bun });
			}
		} else {
			dispatch({ type: ADD_INGREDIENT_TO_CONSTRUCTOR, ...item });
		}
		dispatch({ type: INCREASE_ITEM, ...item });
	};

	return (
		<section className={styles.burger_constructor} ref={dropTarget}>
			{constructorIngredients.length || bun ? (
				<ConstructorList bun={bun} ingredients={constructorIngredients} />
			) : (
				<div className='m-10'>
					<span>Перетащите ингредиенты в конструктор</span>
				</div>
			)}
			<div className={`${styles.total_price} pl-4 pr-4`}>
				<Price price={price} className={styles.price} size='large' />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleOpenModal}>
					Оформить заказ
				</Button>
			</div>
			{isModalOpen && (
				<Modal onCloseModal={handleCloseModal}>
					<OrderDetails orderId={orderNumber} />
				</Modal>
			)}
		</section>
	);
};

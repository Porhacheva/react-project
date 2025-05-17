import { TIngredient } from '@utils/types.ts';
import React, { useMemo, useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorList } from './constructor-list/constructor-list';
import { Price } from '@/components/price/price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../modal/order-details/order-details';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const bun: TIngredient | undefined = ingredients.find(
		(ingredient: TIngredient) => ingredient.type === 'bun'
	);
	const ingredientsList: TIngredient[] = useMemo(() => {
		return [
			ingredients[1],
			ingredients[3],
			ingredients[4],
			ingredients[9],
			ingredients[10],
			ingredients[5],
			ingredients[6],
			ingredients[7],
		];
	}, [ingredients]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const modal = (
		<Modal onCloseModal={handleCloseModal}>
			<OrderDetails orderId={'034536'} />
		</Modal>
	);

	return (
		<section className={styles.burger_constructor}>
			<ConstructorList bun={bun} ingredients={ingredientsList} />
			<div className={`${styles.total_price} pl-4 pr-4`}>
				<Price price={610} className={styles.price} size='large' />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleOpenModal}>
					Оформить заказ
				</Button>
			</div>
			{isModalOpen && modal}
		</section>
	);
};

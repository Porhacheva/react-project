import React, { useState } from 'react';
import { TIngredient } from '@/utils/types';
import { Price } from '@/components/price/price';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/modal/ingredient-details/ingredient-details';
import styles from './ingredients-item.module.css';

type TBurgerIngredientsProps = {
	ingredient: TIngredient;
};

export const IngredientsItem = ({
	ingredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const modal = (
		<Modal header='Детали ингредиента' onCloseModal={handleCloseModal}>
			<IngredientDetails ingredient={ingredient} />
		</Modal>
	);
	return (
		<>
			<div
				className={styles.card}
				onClick={handleOpenModal}
				role='presentation'>
				<Counter count={1} />
				<img
					className={styles.image}
					src={ingredient.image}
					alt={ingredient.name}
				/>
				<Price price={ingredient.price} />
				<span className={styles.name}>{ingredient.name}</span>
			</div>
			{isModalOpen && modal}
		</>
	);
};

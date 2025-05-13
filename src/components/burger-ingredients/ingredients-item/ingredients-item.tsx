import React from 'react';
import styles from './ingredients-item.module.css';
import { TIngredient } from '@/utils/types';
import { Price } from '@/components/price/price';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const IngredientsItem = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<>
			{ingredients.map((ingredient) => {
				return (
					<div className={styles.card} key={ingredient._id}>
						<Counter count={1} />
						<img
							className={styles.image}
							src={ingredient.image}
							alt={ingredient.name}
						/>
						<Price price={ingredient.price} />
						<span className={styles.name}>{ingredient.name}</span>
					</div>
				);
			})}
		</>
	);
};
